const c = require('../controllers');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/', c.group.getGroupList);
router.get('/:id', c.group.getGroup);

router.post('/', auth, c.group.createGroup);

router.put('/:id', auth, c.group.updateGroup);

router.delete('/:id', auth, c.group.deleteGroup)

module.exports = router;