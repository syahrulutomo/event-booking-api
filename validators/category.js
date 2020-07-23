const Joi = require('@hapi/joi');

function validate(category) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    photo: Joi.string().min(4).max(255),
    events: Joi.array().items(Joi.objectId())
  });

  return schema.validate(category);
}

module.exports = validate;