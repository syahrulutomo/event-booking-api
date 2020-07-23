const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 8,
    maxlength: 255,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  venue: {
    type: String,
    maxlength: 255,
    required: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ctiy',
    required: true
  },
  groupHost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group', 
    required: true
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  photos: [String],
  isOnline: Boolean,
  details: {
    type: String,
    minlength: 50,
    maxlength: 255,
    required: true
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

module.exports = eventSchema;