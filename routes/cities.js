const c = require('../controllers');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/', c.city.getCityList);
router.get('/:id', c.city.getCity);
router.get('/find/:name', c.city.searchCity);
router.get('/find/nearest/:latitude/:longitude', c.city.findNearestCity);

router.post('/', auth, c.city.createCity);

router.put('/:id', auth, c.city.updateCity);

router.delete('/:id', auth, c.city.deleteCity);

module.exports = router;