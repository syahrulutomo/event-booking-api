const c = require('../controllers');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/', c.category.getCategoryList);
router.get('/details/:id', c.category.getCategory);
router.get('/find/:name', c.category.getCategoryByName);

router.post('/', auth, c.category.createCategory);

router.put('/:id', auth, c.category.updateCategory);

router.delete('/:id', auth, c.category.deleteCategory);

module.exports = router;