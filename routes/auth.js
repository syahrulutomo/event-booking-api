const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if(!user) return res.status(400).send('Invalid email or password.');
  
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();

  res.header('x-auth-token', token).send(_.pick(user, ['id', 'name', 'email']));
  res.end();
})

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email().min(8).max(50).required(),
    password: Joi.string().min(8).required()
  });

  return schema.validate(req);
}

module.exports = router;