const eventSchema = require('../schemas/event');
const mongoose = require('mongoose');

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;