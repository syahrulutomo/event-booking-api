const _ = require('lodash');
const { User, validateUser } =  require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User
    .find()
    .populate('interest', '-__v')
    .populate('groups', '-__v -members -admin')
    .select('-__v');

  if(!users) return res.status(404).send('Users not found');
  res.send(users);
  res.end();
});

router.get('/:id', async (req, res) => {
  const user = await User
    .findById(req.params.id)
    .select('-__v');
  
  if(!user) return res.status(404).send('Users not found');
  res.send(user);
  res.end();
});

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  
  let user = await User.findOne({ email: req.body.email });
  if(user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password', 'city', 'country', 'interest', 'isAdmin','groups']));
  await user.save();
  
  res.send(_.pick(user, ['id','name', 'email']));
  res.end()
});

router.put('/:id', async (req, res) => {
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findById(req.params.id);
    if(!user) return res.status(404).send('User with given id was not found');

    user.name = req.body.name;
    user.password = req.body.password;
    user.city = req.body.city;
    user.country = req.body.country;
    user.isAdmin = req.body.isAdmin;
    user.photos = req.body.photos;
    user.interest = req.body.interest;
    user.groups = req.body.groups;

    await user.save();
    res.send(user);
    res.end();
});

router.delete('/:id', async (req, res) => {
  let user = await User.findByIdAndRemove({ _id: req.params.id });
  if(!user) return res.status(404).send('User with given id was not found');

  user.send(user);
  res.end();
})

module.exports = router;