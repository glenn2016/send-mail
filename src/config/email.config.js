const { Resend } = require('resend');

// Récupère la clé directement depuis process.env (Railway l'injecte automatiquement)
const apiKey = process.env.RESEND_API_KEY;

// Log pour debug
console.log('🔑 RESEND_API_KEY présente:', !!apiKey);

const resend = new Resend(apiKey);

module.exports = {
  resend
};