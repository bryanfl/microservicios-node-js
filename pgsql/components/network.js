const express = require('express');
const router = express.Router();
const pgSQLController = require('./controller');
const auth = require('../../auth')

router.get('/:table', pgSQLController.list)
router.get('/:table/:id', pgSQLController.listOne)
router.post('/:table', pgSQLController.insert)
router.put('/:table/:id', pgSQLController.update)
router.delete('/:table/:id', pgSQLController.delete)
router.post('/:table/query', pgSQLController.query)

module.exports = router;