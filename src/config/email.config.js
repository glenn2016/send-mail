const nodemailer = require('nodemailer');

// Ne charge dotenv que en local (pas en production)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Création du transporteur SMTP Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Vérification de la connexion au démarrage
const verifyConnection = async () => {
  try {
    await transporter.verify();
    console.log('✅ Connexion SMTP Gmail réussie');
    return true;
  } catch (error) {
    console.error('❌ Erreur connexion SMTP:', error.message);
    return false;
  }
};

module.exports = {
  transporter,
  verifyConnection
};