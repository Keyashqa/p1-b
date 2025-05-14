const mongoose = require('mongoose');

// Define the schema
const goalSchema = new mongoose.Schema(
  {
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
    },
    text: {
      type: String,
      required: [true, 'Please add a text field'],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Export the model
module.exports = mongoose.model('Goal', goalSchema);
