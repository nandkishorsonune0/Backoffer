const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// Define API routes
router.get('/', dataController.getAllData);
router.get('/filter', dataController.getFilteredData);

module.exports = router;
