const express = require('express');
const router = express.Router();
const { sendContactEmail, healthCheck } = require('../controllers/email.controller');

// Route de test - GET /api/health
router.get('/health', healthCheck);

// Route d'envoi d'email - POST /api/send-email
router.post('/send-email', sendContactEmail);

module.exports = router;