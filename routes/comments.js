const auth = require('../middleware/auth');
const _ = require('lodash');
const { Comment, validateComment } = require('../models/comment');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const comments = await Comment
    .find()
    .populate('subject')
    .select('-__v');
  if(!comments) return res.status(404).send('Comments not found');

  res.send(comments);
  res.end();
});

router.get('/:id', auth, async (req, res) => {
  const comment = await Comment
    .findById(req.params.id)
    .populate('subject')
    .select('-__v');
  if(!comments) return res.status(404).send('Comments not found');

  res.send(comments);
  res.end();
});

router.post('/', auth, async (req, res) => {
  const { error } = validateComment(req.body);
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
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validateComment(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const comment = await Comment.findByIdAndUpdate(req.params.id, 
    _.pick(req.body, ['subject', 'content']), { new: true });
    if(!comment) return res.status(404).send('Comments not found');
  
  res.send(comment);
  res.end();
});


router.delete('/', auth, async (req, res) => {
  const comment = await Comment.findByIdAndRemove(req.params.id);
  if(!comment) return res.status(404).send('Comments not found');
  
  res.send(comment);
  res.end();
})
module.exports = router;