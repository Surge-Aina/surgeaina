const express = require('express');
const router = express.Router();
const serviceRequestController = require('../controllers/serviceRequestController');

// POST /api/service-request - Submit service request
router.post('/', serviceRequestController.submitServiceRequest);

module.exports = router;