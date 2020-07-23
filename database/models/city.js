const { model } = require('mongoose');
const citySchema = require('../schemas/city');

const City = model('City', citySchema);

module.exports = City;
