const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true
  },
  admin: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  city: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true
  },
  country: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true
  },
  photos: {
    type: Array
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
});

module.exports = groupSchema;