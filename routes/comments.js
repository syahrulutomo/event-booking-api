const auth = require('../middleware/auth');
const c = require('../controllers');
const express = require('express');
const router = express.Router();

router.get('/', auth, c.comment.getCommentList);
router.get('/:id', auth, c.comment.getComment);

router.post('/', auth, c.comment.createComment);

router.put('/:id', auth, c.comment.updateComment);

router.delete('/', auth, c.comment.deleteComment)

module.exports = router;