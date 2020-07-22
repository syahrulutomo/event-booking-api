const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    maxlength: 255,
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = commentSchema;