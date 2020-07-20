const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

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
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  country: {
    type: String,
    minlength: 3,
    maxlength: 255,
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
  }]
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().email().min(8).max(50),
    password: Joi.string().alphanum().min(8).required(),
    city: Joi.string().min(3),
    country: Joi.string().min(3),
    isAdmin: Joi.boolean(),
    photos: Joi.array().items(Joi.string()),
    interest: Joi.array().items(Joi.objectId().required()),
    groups: Joi.array().items(Joi.objectId().required())
  });

  return schema.validate(user);
}

module.exports.User = User;
module.exports.userSchema = userSchema;
module.exports.validateUser = validateUser;