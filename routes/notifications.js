const auth = require('../middleware/auth');
const c = require('../controllers');
const express = require('express');
const router = express.Router();

router.get('/', auth, c.notification.getNotificationList);
router.get('/:id', auth, c.notification.getNotification);

router.post('/', auth, c.notification.createNotification);

router.put('/:id', auth, c.notification.updateNotification);

// router.delete('/', c.notification.deleteNotification);

module.exports = router;