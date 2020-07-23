const Category = require('../database/models/category');
const validate = require('../validators');

module.exports = {
  async getCategoryList (req, res, next) {
    try {
      const categories = await Category
        .find()
        .populate('events')
        .sort({ name: 1 });
      res.send(categories);
      res.end();
    } catch(err) {
      return res.status(404).send('Categories not found');
    }
  },
  async getCategory (req, res, next) {
    try {
      const category = await Category
        .findById(req.params.id)
        .populate('events')
        .sort({ name: 1 });
      res.send(category);
      res.end();
    } catch(err) {
      return res.status(404).send('Categories not found');
    }
  },
  async createCategory (req, res, next) {
    const { error } = validate.category(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
    let category = new Category({
      name: req.body.name,
      photo: req.body.photo,
      events: req.body.events
    });
  
    await category.save();
    res.send(category);
    res.end();
  },
  async updateCategory (req, res, next) {
    const { error } = validate(req.body);
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
      next(err.message);
      return res.status(404).send('Category with given id was not found');
    }
  },
  async deleteCategory (req, res, next) {
    try {
      const category = await Category.findByIdAndRemove({ _id: req.params.id });
      if(!category) return res.status(404).send('Category with given id was not found');
    
      res.send(category);
      res.end();
    }
    catch(err) {
      next(err.message);
      return res.status(404).send('Category with given id was not found');
    }
  }
}