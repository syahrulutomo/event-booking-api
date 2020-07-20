const _ = require('lodash');
const { Event, validateEvent } = require('../models/event');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const events = await Event
    .find()
    .populate('groupHost', '-__v')
    .populate('host', '-__v')
    .populate('attendees', '-__v')
    .populate('category', '-__v')
    .populate('comments', '-__v')
    .select('-__v');
  if(!events) return res.status(404).send('Events was not found');

  res.send(events);
  res.end();
});

router.get('/:id', async (req, res) => {
  const events = await Event
    .findById(req.params.id)
    .populate('groupHost', '-__v')
    .populate('host', '-__v')
    .populate('attendees', '-__v')
    .populate('category', '-__v')
    .populate('comments', '-__v')
    .select('-__v');
  if(!events) return res.status(404).send('Events with given id was not found');

  res.send(events);
  res.end();
});

router.post('/', async (req, res) => {
  const { error } = validateEvent(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let event = new Event(
    _.pick(req.body, 
      ['title', 
       'date', 
       'venue', 
       'groupHost', 
       'host', 
       'photos', 
       'isOnline', 
       'details', 
       'attendees', 
       'category',
      'comments']));
  try {
    await event.save()
    res.send(event);
    res.end()
  } catch(err) {
    return res.status(400).send(err);
  }
});

router.put('/:id', async (req, res) => {
  const { error } = validateEvent(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const event = await Event.findByIdAndUpdate(req.params.id, 
    _.pick(req.body, 
      ['title', 
       'date', 
       'venue', 
       'groupHost', 
       'host', 
       'photos', 
       'isOnline', 
       'details', 
       'attendees', 
       'category',
      'comments']), { new: true });
  if(!event) return res.status(404).send('Event with given id was not found');

  res.send(event);
  res.end();
});

router.delete('/', async (req, res) => {
  const event = await Event.findByIdAndRemove(req.params.id);
  if(!event) return res.status(404).send('Event with given id was not found');

  res.send(event);
  res.end();
})

module.exports = router;
