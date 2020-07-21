const auth = require('../middleware/auth');
const { Category, validateCategory } = require('../models/category')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.send(categories);
    res.end();
  } catch(err) {
    return res.status(404).send('Categories not found');
  }
});

router.post('/', async (req, res) => {
  const { error } = validateCategory(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let category = new Category({
    name: req.body.name
  });

  await category.save();
  res.send(category);
  res.end();
})

router.put('/:id', async(req, res) => {
  const { error } = validateCategory(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, {
      name: req.body.name
    }, { new: true });
    if(!category) return res.status(404).send('Category with given id was not found');
  
    res.send(category);
    res.end();
  }
  catch(err) {
    console.log(err.message);
    return res.status(404).send('Category with given id was not found');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove({ _id: req.params.id });
    if(!category) return res.status(404).send('Category with given id was not found');
  
    res.send(category);
    res.end();
  }
  catch(err) {
    console.log(err.message);
    return res.status(404).send('Category with given id was not found');
  }
});

module.exports = router;