const c = require('../controllers');
const express = require('express');
const router = express.Router();

router.get('/', c.city.getCityList);
router.get('/:id', c.city.getCity);

router.post('/', c.city.createCity);

router.put('/:id', c.city.updateCity);

router.delete('/:id', c.city.deleteCity);

module.exports = router;