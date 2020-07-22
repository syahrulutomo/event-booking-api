const { model } = require('mongoose');
const commentSchema = require('../schemas/comment');

const Comment = model('Comment', commentSchema);

module.exports = Comment;
