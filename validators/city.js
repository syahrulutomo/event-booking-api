const Joi = require('@hapi/joi');

function validate(city) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    country: Joi.string().min(5).max(25).required(),
    countryAbbr: Joi.string().max(2).required(),
    lat: Joi.number().required(),
    long: Joi.number().required()
  });

  return schema.validate(city);
}

module.exports = validate;