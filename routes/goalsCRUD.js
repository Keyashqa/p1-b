// routes/goals.js

const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');  

const {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalsCtrl');

// Base: /api/goals
router.route('/').get(protect,getGoals).post(protect,createGoal);

router.put('/:id',protect, updateGoal);
router.delete('/:id',protect, deleteGoal);

module.exports = router;
