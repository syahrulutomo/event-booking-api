const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

function validateEvent(event) {
  const schema = Joi.object({
    title: Joi.string().min(8).max(255).required(),
    date: Joi.date().iso().required(),
    venue: Joi.string().max(255).required(),
    city: Joi.objectId().required(),
    groupHost: Joi.objectId().required(),
    host: Joi.objectId().required(),
    photos: Joi.array().items(Joi.string().required()),
    isOnline: Joi.boolean(),
    details: Joi.string().min(50).required(),
    attendees: Joi.array().items(Joi.objectId()),
    category: Joi.objectId().required(),
    comments: Joi.array().items(Joi.objectId())
  });

  return schema.validate(event);
}

module.exports = validateEvent;
