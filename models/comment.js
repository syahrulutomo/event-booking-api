const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const commentSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

const Comment = mongoose.model('Comment', commentSchema);

function validateComment(comment) {
  const schema = Joi.object({
    subject: Joi.objectId().required(),
    content: Joi.string().max(255),
    date: Joi.date().iso()
  })

  return schema.validate(comment);
}

module.exports.Comment = Comment;
module.exports.commentSchema = commentSchema;
module.exports.validateComment = validateComment;