const nodemailer = require('nodemailer');
require('dotenv').config();

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