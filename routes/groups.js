const c = require('../controllers');
const express = require('express');
const router = express.Router();

router.get('/', c.group.getGroupList);
router.get('/:id', c.group.getGroup);

router.post('/', c.group.createGroup);

router.put('/:id', c.group.updateGroup);

router.delete('/:id', c.group.deleteGroup)

module.exports = router;