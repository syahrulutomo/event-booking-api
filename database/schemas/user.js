const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true
  },
  email: {
    type: String,
    unique: true,
    minlength: 8,
    maxlength: 50,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  }, 
  joined_at: {
    type: Date,
    default: Date.now()
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true
  },
  isAdmin: Boolean,
  photos: {
    type: Array
  },
  interest: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  }],
  notifications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification'
  }]
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this.id }, process.env.PRIVATE_KEY);
  return token;
}

module.exports = userSchema;