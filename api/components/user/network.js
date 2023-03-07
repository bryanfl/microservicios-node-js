const express = require('express');
const router = express.Router();
const UserController = require('./controller');
const auth = require('../../../auth')

const userController = new UserController();

router.get('/', auth.verifyToken, userController.list)
router.post('/', auth.verifyToken, userController.insert)
router.put('/:id', auth.verifyToken, userController.update)
router.delete('/:id', auth.verifyToken, userController.delete)
router.post('/follow/:idUserTo', auth.verifyToken, userController.follow)

module.exports = router;