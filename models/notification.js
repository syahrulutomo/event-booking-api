const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const notificationSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  content: {
    type: String,
    maxlength: 255,
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

function validateNotification(notification) {
  const schema = Joi.object({
    subject: Joi.objectId().required(),
    content: Joi.string().max(255),
    date: Joi.date().iso()
  })

  return schema.validate(notification);
}

module.exports.Notification = Notification;
module.exports.notificationSchema = notificationSchema;
module.exports.validateNotification = validateNotification;