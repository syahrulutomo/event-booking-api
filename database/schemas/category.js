const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true
  },
  photo: {
    type: String,
    minlength: 4,
    maxlength: 255,
    required: true
  },
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }]
});

module.exports = categorySchema;