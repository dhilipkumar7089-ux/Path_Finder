const express = require('express');
const db = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all quiz questions
router.get('/questions', async (req, res) => {
  try {
    const [questions] = await db.query(
      'SELECT id, question, domain, option_a, option_b, option_c, option_d FROM quiz_questions'
    );
    res.json(questions);
  } catch (error) {
    console.error('Fetch questions error:', error);
    res.status(500).json({ error: 'Server error fetching questions' });
  }
});

// Submit quiz answers
router.post('/submit', auth, async (req, res) => {
  try {
    const { answers } = req.body; // answers: [{ question_id, selected_answer }]
    const student_id = req.user.id;

    // Clear previous responses for this student
    await db.query('DELETE FROM quiz_responses WHERE student_id = ?', [student_id]);

    // Insert new responses
    for (const answer of answers) {
      await db.query(
        'INSERT INTO quiz_responses (student_id, question_id, selected_answer) VALUES (?, ?, ?)',
        [student_id, answer.question_id, answer.selected_answer]
      );
    }

    // Calculate domain scores
    const [responses] = await db.query(
      `SELECT qr.question_id, qr.selected_answer, qq.domain, qq.correct_answer
       FROM quiz_responses qr
       JOIN quiz_questions qq ON qr.question_id = qq.id
       WHERE qr.student_id = ?`,
      [student_id]
    );

    const domainScores = {
      engineering: 0,
      medical: 0,
      commerce: 0,
      arts: 0
    };

    responses.forEach(response => {
      if (response.selected_answer === response.correct_answer) {
        domainScores[response.domain]++;
      }
    });

    // Get top domain
    const topDomain = Object.keys(domainScores).reduce((a, b) => 
      domainScores[a] > domainScores[b] ? a : b
    );

    // Get courses in top domain
    const [courses] = await db.query(
      `SELECT c.id, c.name, c.domain, c.duration, c.description, col.name as college_name, col.district
       FROM courses c
       JOIN colleges col ON c.college_id = col.id
       WHERE c.domain = ?
       LIMIT 5`,
      [topDomain]
    );

    res.json({
      message: 'Quiz submitted successfully',
      domainScores,
      topDomain,
      suggestedCourses: courses
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ error: 'Server error submitting quiz' });
  }
});

// Get student's quiz results
router.get('/results', auth, async (req, res) => {
  try {
    const student_id = req.user.id;

    const [responses] = await db.query(
      `SELECT qr.question_id, qr.selected_answer, qq.domain, qq.correct_answer
       FROM quiz_responses qr
       JOIN quiz_questions qq ON qr.question_id = qq.id
       WHERE qr.student_id = ?`,
      [student_id]
    );

    if (responses.length === 0) {
      return res.json({ taken: false, message: 'Quiz not yet taken' });
    }

    const domainScores = {
      engineering: 0,
      medical: 0,
      commerce: 0,
      arts: 0
    };

    responses.forEach(response => {
      if (response.selected_answer === response.correct_answer) {
        domainScores[response.domain]++;
      }
    });

    const topDomain = Object.keys(domainScores).reduce((a, b) => 
      domainScores[a] > domainScores[b] ? a : b
    );

    const [courses] = await db.query(
      `SELECT c.id, c.name, c.domain, c.duration, c.description, col.name as college_name, col.district
       FROM courses c
       JOIN colleges col ON c.college_id = col.id
       WHERE c.domain = ?
       LIMIT 5`,
      [topDomain]
    );

    res.json({
      taken: true,
      domainScores,
      topDomain,
      suggestedCourses: courses
    });
  } catch (error) {
    console.error('Get results error:', error);
    res.status(500).json({ error: 'Server error fetching results' });
  }
});

module.exports = router;
