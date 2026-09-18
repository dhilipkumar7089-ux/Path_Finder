const express = require('express');
const db = require('../config/db');

const router = express.Router();

// Get roadmap for a specific course
router.get('/course/:course_id', async (req, res) => {
  try {
    const { course_id } = req.params;

    const [roadmap] = await db.query(
      `SELECT id, course_id, step_number, step_title, step_description, duration
       FROM career_roadmaps
       WHERE course_id = ?
       ORDER BY step_number`,
      [course_id]
    );

    res.json(roadmap);
  } catch (error) {
    console.error('Fetch roadmap error:', error);
    res.status(500).json({ error: 'Server error fetching roadmap' });
  }
});

module.exports = router;
