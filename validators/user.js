const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

function validate(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().email().min(8).max(50),
    password: Joi.string().alphanum().min(8).required(),
    city: Joi.objectId().required(),
    isAdmin: Joi.boolean(),
    photos: Joi.array().items(Joi.string()),
    interest: Joi.array().items(Joi.objectId()),
    groups: Joi.array().items(Joi.objectId()),
    notifications: Joi.array().items(Joi.objectId())
  });

  return schema.validate(user);
}

module.exports = validate;