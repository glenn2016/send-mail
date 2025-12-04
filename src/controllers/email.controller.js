const { transporter } = require('../config/email.config');
const { contactEmailTemplate, confirmationEmailTemplate } = require('../templates/contact.template');
require('dotenv').config();

// Envoyer un email de contact
const sendContactEmail = async (req, res) => {
  try {
    const { nom, email, telephone, objet, message } = req.body;

    // Validation des champs requis
    if (!nom || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Les champs nom, email et message sont requis'
      });
    }

    // Validation format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Format d\'email invalide'
      });
    }

    // 1. Email envoyé à TOI (le propriétaire du portfolio)
    const contactMail = {
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: `📬 Portfolio: ${objet || 'Nouveau message'}`,
      html: contactEmailTemplate({ nom, email, telephone, objet, message })
    };

    await transporter.sendMail(contactMail);
    console.log(`✅ Email envoyé à ${process.env.RECIPIENT_EMAIL}`);

    // 2. Email de confirmation envoyé à L'EXPÉDITEUR
    const confirmationMail = {
      from: `"Glenn Leonard MOUNGOLO" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: '✅ Message bien reçu !',
      html: confirmationEmailTemplate({ nom })
    };

    await transporter.sendMail(confirmationMail);
    console.log(`✅ Confirmation envoyée à ${email}`);

    // Réponse succès
    res.status(200).json({
      success: true,
      message: 'Email envoyé avec succès !'
    });

  } catch (error) {
    console.error('❌ Erreur envoi email:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'envoi de l\'email',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Health check
const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API opérationnelle 🚀',
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  sendContactEmail,
  healthCheck
};