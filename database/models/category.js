const { model } = require('mongoose');
const categorySchema = require('../schemas/category');

const Category = model('Category', categorySchema);

module.exports = Category;
