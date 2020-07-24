const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

function validate(group) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    admin: Joi.array().items(Joi.objectId().required()),
    city: Joi.objectId().required(),
    photos: Joi.array().items(Joi.string()),
    members: Joi.array().items(Joi.objectId()),
  });

  return schema.validate(group);
}

module.exports = validate;