const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
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

module.exports = notificationSchema;