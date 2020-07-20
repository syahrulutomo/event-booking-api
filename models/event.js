const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

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

const Event = mongoose.model('Event', eventSchema);

function validateEvent(event) {
  const schema = Joi.object({
    title: Joi.string().min(8).max(255).required(),
    date: Joi.date().iso().required(),
    venue: Joi.string().max(255).required(),
    groupHost: Joi.objectId().required(),
    host: Joi.objectId().required(),
    photos: Joi.array().items(Joi.string().required()),
    isOnline: Joi.boolean(),
    details: Joi.string().min(50).max(255).required(),
    attendees: Joi.array().items(Joi.objectId()),
    category: Joi.objectId().required(),
    comments: Joi.array().items(Joi.objectId())
  });

  return schema.validate(event);
}

module.exports.eventSchema = eventSchema;
module.exports.Event = Event;
module.exports.validateEvent = validateEvent;
