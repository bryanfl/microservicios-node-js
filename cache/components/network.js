const express = require('express');
const router = express.Router();
const cacheController = require('./controller');

router.get('/:table', cacheController.list)
router.get('/:table/:id', cacheController.listOne)
router.post('/:table', cacheController.insert)
router.put('/:table/:id', cacheController.insert)

module.exports = router;