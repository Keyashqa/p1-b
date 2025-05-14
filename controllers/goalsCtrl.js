const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalmodal'); // Import the Mongoose model
const User = require('../models/userModal'); // Import the User model

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id }); // Fetch goals for the authenticated user
  if (!goals) { 
    res.status(404).json({ message: 'No goals found' });
  }
  res.status(200).json(goals);
});


const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const goal = await Goal.create({
    user: req.user.id,
    text: req.body.text
  });

  res.status(201).json(goal);
});

const updateGoal = asyncHandler(async (req, res) => {
    // Find the goal by ID
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(404);
        throw new Error('Goal not found');
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    // Check if the logged-in user is the owner of the goal
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized to update this goal');
    }

    // Update the goal
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedGoal);
});


const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);
    throw new Error('Goal not found');
  }

  const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    // Check if the logged-in user is the owner of the goal
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('Not authorized to update this goal');
    }

  await goal.deleteOne(); // Or use Goal.findByIdAndDelete(req.params.id)

  res.status(200).json({ message: 'Goal deleted', id: req.params.id });
});

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
