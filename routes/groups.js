const { Group, validateGroup } = require('../models/group');
const _ = require('lodash');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const groups = await Group
    .find()
    .populate('admin', '-photos -__v -interest -password -joined_at')
    .populate('members', '-photos -__v -interest -password -joined_at')
    .select('-__v');

  if(!groups) return res.status(404).send('Groups was not found');

  res.send(groups);
  res.end();
});

router.get('/:id', async (req, res) => {
  const group = Group.findById(req.params.id);
  if(!groups) return res.status(404).send('Group was not found');

  res.send(group);
  res.end();
});

router.post('/', async (req, res) => {
  const { error } = validateGroup(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  
  let group = new Group({
    name: req.body.name,
    city: req.body.city,
    country: req.body.country,
    admin: req.body.admin,
    photos: req.body.photos,
    members: req.body.members
  });
  
  try {
    await group.save();
  } 
  catch(err) {
    return res.status(400).send('Bad request');
  }
  res.send(group);
  res.end();
});

router.put('/:id', async (req, res) => {
  const { error } = validateGroup(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const group = await Group.findByIdAndUpdate(
    req.params.id, {
      name: req.body.name,
      admin: req.body.admin,
      city: req.body.city,
      country: req.body.country,
      photos: req.body.photos,
      members: req.body.members
    }, {new: true});
  if(!group) return res.status(404).send('Group was not found');

  res.send(group);
  res.end(); 
});

router.delete('/:id', async (req, res) => {
  const group = await Group.findByIdAndRemove(req.params.id);
  if(!group) return res.status(404).send('Group was not found');

  res.send(group);
  res.end(); 
})

module.exports = router;