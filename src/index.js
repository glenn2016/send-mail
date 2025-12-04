const express = require('express');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');

const emailRoutes = require('./routes/email.routes');
const { verifyConnection } = require('./config/email.config');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().none());

// Routes
app.use('/api', emailRoutes);

// Route racine
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Portfolio Email API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      sendEmail: 'POST /api/send-email'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route non trouvée'
  });
});

// Démarrage du serveur
const startServer = async () => {
  // Vérifier la connexion SMTP
  await verifyConnection();

  app.listen(PORT, () => {
    console.log('');
    console.log('=================================');
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
    console.log(`❤️  Health: http://localhost:${PORT}/api/health`);
    console.log('=================================');
    console.log('');
  });
};

startServer();