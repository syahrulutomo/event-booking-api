const c = require('../controllers');
const express = require('express');
const router = express.Router();

router.get('/', c.user.getUserList);
router.get('/:id', c.user.getUser);

router.post('/', c.user.createUser);

router.put('/:id', c.user.updateUser);

router.delete('/:id', c.user.deleteUser)

module.exports = router;