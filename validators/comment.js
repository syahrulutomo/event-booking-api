const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

function validate(comment) {
  const schema = Joi.object({
    subject: Joi.objectId().required(),
    content: Joi.string().max(255),
    date: Joi.date().iso()
  })

  return schema.validate(comment);
}

module.exports = validate;