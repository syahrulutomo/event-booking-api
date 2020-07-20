const _ = require('lodash');
const { Comment, validateComment } = require('../models/comment');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const comments = await Comment
    .find()
    .populate('subject')
    .select('-__v');
  if(!comments) return res.status(404).send('Comments not found');

  res.send(comments);
  res.end();
});

router.get('/:id', async (req, res) => {
  const comment = await Comment
    .findById(req.params.id)
    .populate('subject')
    .select('-__v');
  if(!comments) return res.status(404).send('Comments not found');

  res.send(comments);
  res.end();
});

router.post('/', async (req, res) => {
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
})

module.exports = router;