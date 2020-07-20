const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

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

const Group = mongoose.model('Group', groupSchema);

function validateGroup(group) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    admin: Joi.array().items(Joi.objectId().required()),
    city: Joi.string().min(3).max(255).required(),
    country: Joi.string().min(3).max(255).required(),
    photos: Joi.array(),
    members: Joi.array().items(Joi.objectId().required()),
  });

  return schema.validate(group);
}

module.exports.groupSchema = groupSchema;
module.exports.Group = Group;
module.exports.validateGroup = validateGroup;