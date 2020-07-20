const auth = require('../middleware/auth');
const _ = require('lodash');
const { Notification, validateNotification } = require('../models/notification');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const notification = await Notification
    .find()
    .populate('subject')
    .select('-__v');
  if(!notification) return res.status(404).send('Notifications not found');

  res.send(notifications);
  res.end();
});

router.get('/:id', auth, async (req, res) => {
  const notification = await Notification
    .findById(req.params.id)
    .populate('subject')
    .select('-__v');
  if(!notification) return res.status(404).send('Notification not found');

  res.send(notification);
  res.end();
});

router.post('/', auth, async (req, res) => {
  const { error } = validateNotification(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const notification = new Notification(
    _.pick(req.body, ['subject', 'content'])
  );

  try {
    await notification.save()
    res.send(notification);
    res.end()
  } catch(err) {
    return res.status(400).send(err);
  }
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validateNotification(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const notification = await Notification.findByIdAndUpdate(req.params.id, 
    _.pick(req.body, ['subject', 'content']), { new: true });
    if(!notification) return res.status(404).send('Notification not found');
  
  res.send(notification);
  res.end();
});


router.delete('/', auth, async (req, res) => {
  const notification = await Notification.findByIdAndRemove(req.params.id);
  if(!notification) return res.status(404).send('Notifications not found');
  
  res.send(notification);
  res.end();
})
module.exports = router;