const c = require('../controllers');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/', c.event.getEventList);
router.get('/details/:id', c.event.getEvent);
router.get('/nearest/:latitude/:longitude', c.event.getNearestEvent);
router.get('/find/:name/:latitude/:longitude', c.event.searchEvent);

router.post('/', auth, c.event.createEvent);

router.put('/:id', auth, c.event.updateEvent);

router.delete('/', auth, c.event.deleteEvent);

module.exports = router;
