const mongoose = require('mongoose');
const pointSchema = require('./point');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true
  },
  country: {
    type: String,
    minlength: 5,
    maxlength: 25,
    required: true
  },
  countryAbbr: {
    type: String,
    maxlength: 2,
    required: true
  },
  lat: {
    type: Number,
    minlength: 3,
    maxlength: 10,
    required: true
  },
  long: {
    type: Number,
    minlength: 3,
    maxlength: 10,
    required: true
  },
  location: {
    type: pointSchema,
    required: true
  }
});

citySchema.index({ location: "2dsphere" });

module.exports = citySchema;