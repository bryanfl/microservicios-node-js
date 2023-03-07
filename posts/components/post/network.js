const express = require('express');
const router = express.Router();
const PostController = require('./controller');
const auth = require('../../../auth')

const postController = new PostController();

router.get('/', auth.verifyToken, postController.list)
router.post('/', auth.verifyToken, postController.insert)
router.put('/:id', auth.verifyToken, postController.update)
router.delete('/:id', auth.verifyToken, postController.delete)
router.post('/like/:idPost', auth.verifyToken, postController.likePost)

module.exports = router;