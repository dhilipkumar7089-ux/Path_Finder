const express = require('express');
const db = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all colleges with optional filters
router.get('/', async (req, res) => {
  try {
    const { district, student_cutoff, student_category } = req.query;

    let query = `
      SELECT c.id, c.name, c.district, c.state, c.description, c.infrastructure, c.website, c.image1
      FROM colleges c
      WHERE 1=1
    `;
    const params = [];

    if (district) {
      query += ' AND c.district = ?';
      params.push(district);
    }

    const [colleges] = await db.query(query, params);

    // For each college, get courses and check eligibility
    const collegesWithCourses = await Promise.all(
      colleges.map(async (college) => {
        const [courses] = await db.query(
          `SELECT co.id, co.name, co.domain, co.duration, 
           (SELECT cutoff_mark FROM course_cutoffs WHERE course_id = co.id AND category = ? LIMIT 1) as cutoff,
           (SELECT seat_count FROM course_cutoffs WHERE course_id = co.id AND category = ? LIMIT 1) as seats
           FROM courses co
           WHERE co.college_id = ?`,
          [student_category || 'OC', student_category || 'OC', college.id]
        );

        // Mark eligible courses
        const coursesWithEligibility = courses.map(course => ({
          ...course,
          eligible: student_cutoff ? parseFloat(student_cutoff) >= parseFloat(course.cutoff) : null
        }));

        return {
          ...college,
          courses: coursesWithEligibility
        };
      })
    );

    res.json(collegesWithCourses);
  } catch (error) {
    console.error('Fetch colleges error:', error);
    res.status(500).json({ error: 'Server error fetching colleges' });
  }
});

// Get college details by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [colleges] = await db.query(
      'SELECT * FROM colleges WHERE id = ?',
      [id]
    );

    if (colleges.length === 0) {
      return res.status(404).json({ error: 'College not found' });
    }

    const college = colleges[0];

    // Get courses with cutoffs
    const [courses] = await db.query(
      `SELECT co.id, co.name, co.domain, co.duration, co.description,
       GROUP_CONCAT(
         CONCAT(cc.category, ':', cc.cutoff_mark, ':', cc.seat_count)
         SEPARATOR '||'
       ) as cutoffs
       FROM courses co
       LEFT JOIN course_cutoffs cc ON co.id = cc.course_id
       WHERE co.college_id = ?
       GROUP BY co.id`,
      [id]
    );

    // Parse cutoffs
    const coursesWithCutoffs = courses.map(course => {
      const cutoffArray = course.cutoffs ? course.cutoffs.split('||') : [];
      const cutoffDetails = cutoffArray.map(c => {
        const [category, cutoff, seats] = c.split(':');
        return { category, cutoff: parseFloat(cutoff), seats: parseInt(seats) };
      });

      return {
        ...course,
        cutoffs: cutoffDetails
      };
    });

    res.json({
      ...college,
      courses: coursesWithCutoffs
    });
  } catch (error) {
    console.error('Fetch college error:', error);
    res.status(500).json({ error: 'Server error fetching college details' });
  }
});

// Get all districts
router.get('/meta/districts', async (req, res) => {
  try {
    const [districts] = await db.query(
      'SELECT DISTINCT district FROM colleges ORDER BY district'
    );
    res.json(districts.map(d => d.district));
  } catch (error) {
    console.error('Fetch districts error:', error);
    res.status(500).json({ error: 'Server error fetching districts' });
  }
});

// Bookmark a college
router.post('/bookmark', auth, async (req, res) => {
  try {
    const { college_id } = req.body;
    const student_id = req.user.id;

    await db.query(
      'INSERT INTO bookmarks (student_id, college_id) VALUES (?, ?)',
      [student_id, college_id]
    );

    res.json({ message: 'College bookmarked successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'College already bookmarked' });
    }
    console.error('Bookmark error:', error);
    res.status(500).json({ error: 'Server error bookmarking college' });
  }
});

// Remove bookmark
router.delete('/bookmark/:college_id', auth, async (req, res) => {
  try {
    const { college_id } = req.params;
    const student_id = req.user.id;

    await db.query(
      'DELETE FROM bookmarks WHERE student_id = ? AND college_id = ?',
      [student_id, college_id]
    );

    res.json({ message: 'Bookmark removed successfully' });
  } catch (error) {
    console.error('Remove bookmark error:', error);
    res.status(500).json({ error: 'Server error removing bookmark' });
  }
});

// Get student's bookmarks
router.get('/bookmarks/list', auth, async (req, res) => {
  try {
    const student_id = req.user.id;

    const [bookmarks] = await db.query(
      `SELECT c.id, c.name, c.district, c.state, c.description, c.image1, c.website
       FROM bookmarks b
       JOIN colleges c ON b.college_id = c.id
       WHERE b.student_id = ?
       ORDER BY b.created_at DESC`,
      [student_id]
    );

    res.json(bookmarks);
  } catch (error) {
    console.error('Fetch bookmarks error:', error);
    res.status(500).json({ error: 'Server error fetching bookmarks' });
  }
});

module.exports = router;
