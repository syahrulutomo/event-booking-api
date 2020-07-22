const Joi = require('@hapi/joi');

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email().min(8).max(50).required(),
    password: Joi.string().min(8).required()
  });

  return schema.validate(req);
}

module.exports = validate;