const c = require('../controllers');
const express = require('express');
const router = express.Router();

router.get('/', c.category.getCategoryList);
router.get('/:id', c.category.getCategory);

router.post('/', c.category.createCategory);

router.put('/:id', c.category.updateCategory);

router.delete('/:id', c.category.deleteCategory);

module.exports = router;