const Comment = require('../database/models/comment');
const validate = require('../validators');
require('mongoose');
const _ = require('lodash');

module.exports = {
  async getCommentList (req, res) {
    const comments = await Comment
      .find()
      .populate('subject')
      .select('-__v');
    if(!comments) return res.status(404).send('Comments not found');
  
    res.send(comments);
    res.end();
  },
  async getComment (req, res) {
    const comment = await Comment
      .findById(req.params.id)
      .populate('subject')
      .select('-__v');
    if(!comment) return res.status(404).send('Comments not found');
  
    res.send(comment);
    res.end();
  },
  async createComment (req, res) {
    const { error } = validate.comment(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
    const comment = new Comment(
      _.pick(req.body, ['subject', 'content'])
    );
  
    try {
      await comment.save()
      res.send(comment);
      res.end()
    } catch(err) {
      return res.status(400).send(err);
    }
  },
  async updateComment (req, res) {
    const { error } = validate.comment(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
    const comment = await Comment.findByIdAndUpdate(req.params.id, 
      _.pick(req.body, ['subject', 'content']), { new: true });
      if(!comment) return res.status(404).send('Comments not found');
    
    res.send(comment);
    res.end();
  },
  async deleteComment (req, res) {
    const comment = await Comment.findByIdAndRemove(req.params.id);
    if(!comment) return res.status(404).send('Comments not found');
    
    res.send(comment);
    res.end();
  }
}