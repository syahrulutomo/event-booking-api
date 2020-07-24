const c = require('../controllers');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

// router.get('/', auth, c.user.getUserList);
router.get('/:id', auth, c.user.getUser);

router.post('/', c.user.createUser);

router.put('/:id', auth, c.user.updateUser);

router.delete('/:id', auth, c.user.deleteUser)

module.exports = router;