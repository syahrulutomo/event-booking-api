const c = require('../controllers');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/', c.city.getCityList);
router.get('/:id', c.city.getCity);

router.post('/', auth, c.city.createCity);

router.put('/:id', auth, c.city.updateCity);

router.delete('/:id', auth, c.city.deleteCity);

module.exports = router;