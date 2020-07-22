const mongoose = require('mongoose');
const notificationSchema = require('../schemas/notification');

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;