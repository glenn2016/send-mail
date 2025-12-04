// Template de l'email que TU reçois quand quelqu'un te contacte
const contactEmailTemplate = (data) => {
  const { nom, email, telephone, objet, message } = data;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">📬 Nouveau Message</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Via ton portfolio</p>
        </div>
        
        <!-- Content -->
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e2e8f0;">
          
          <!-- Nom -->
          <div style="margin-bottom: 20px;">
            <div style="font-weight: bold; color: #1e40af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">👤 Nom complet</div>
            <div style="margin-top: 8px; color: #334155; font-size: 16px; padding: 12px; background: #f8fafc; border-radius: 5px; border-left: 3px solid #3b82f6;">${nom}</div>
          </div>
          
          <!-- Email -->
          <div style="margin-bottom: 20px;">
            <div style="font-weight: bold; color: #1e40af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">📧 Email</div>
            <div style="margin-top: 8px; color: #334155; font-size: 16px; padding: 12px; background: #f8fafc; border-radius: 5px; border-left: 3px solid #3b82f6;">
              <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
            </div>
          </div>
          
          <!-- Téléphone (si fourni) -->
          ${telephone ? `
          <div style="margin-bottom: 20px;">
            <div style="font-weight: bold; color: #1e40af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">📱 Téléphone</div>
            <div style="margin-top: 8px; color: #334155; font-size: 16px; padding: 12px; background: #f8fafc; border-radius: 5px; border-left: 3px solid #3b82f6;">
              <a href="tel:${telephone}" style="color: #3b82f6; text-decoration: none;">${telephone}</a>
            </div>
          </div>
          ` : ''}
          
          <!-- Objet -->
          <div style="margin-bottom: 20px;">
            <div style="font-weight: bold; color: #1e40af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">📝 Objet</div>
            <div style="margin-top: 8px; color: #334155; font-size: 16px; padding: 12px; background: #f8fafc; border-radius: 5px; border-left: 3px solid #3b82f6;">${objet || 'Non spécifié'}</div>
          </div>
          
          <!-- Message -->
          <div style="margin-bottom: 20px;">
            <div style="font-weight: bold; color: #1e40af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">💬 Message</div>
            <div style="margin-top: 8px; color: #334155; font-size: 16px; padding: 20px; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</div>
          </div>
          
        </div>
        
        <!-- Footer -->
        <div style="background: #1e293b; color: #94a3b8; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px;">
          <p style="margin: 0;">Email envoyé depuis le formulaire de contact</p>
          <p style="margin: 10px 0 0 0;">© ${new Date().getFullYear()} Glenn Leonard MOUNGOLO</p>
        </div>
        
      </div>
    </body>
    </html>
  `;
};

// Template de confirmation envoyé à l'EXPÉDITEUR
const confirmationEmailTemplate = (data) => {
  const { nom } = data;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
          <h1 style="margin: 0; font-size: 24px;">Message bien reçu !</h1>
        </div>
        
        <!-- Content -->
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; text-align: center;">
          <p style="font-size: 18px; color: #334155; margin: 0 0 15px 0;">
            Bonjour <strong>${nom}</strong>,
          </p>
          <p style="font-size: 16px; color: #64748b; line-height: 1.6; margin: 0 0 20px 0;">
            Merci de m'avoir contacté !<br>
            J'ai bien reçu votre message et je vous répondrai dans les plus brefs délais.
          </p>
          <p style="font-size: 14px; color: #94a3b8; margin: 0;">
            À très bientôt ! 👋
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background: #1e293b; color: #94a3b8; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px;">
          <p style="margin: 0; color: #ffffff;">Glenn Leonard MOUNGOLO</p>
          <p style="margin: 5px 0 0 0;">Développeur Web Full-Stack</p>
        </div>
        
      </div>
    </body>
    </html>
  `;
};

module.exports = {
  contactEmailTemplate,
  confirmationEmailTemplate
};