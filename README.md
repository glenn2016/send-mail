# 📧 Portfolio Email API

Une API REST simple et efficace pour envoyer des emails depuis un formulaire de contact de portfolio. Construite avec Node.js, Express et Nodemailer.

![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.x-blue?style=flat-square&logo=express)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

## ✨ Fonctionnalités

- 📬 Envoi d'emails via Gmail SMTP
- ✅ Email de confirmation automatique à l'expéditeur
- 🎨 Templates HTML responsive et stylés
- 🔒 Validation des données
- 🚀 Prêt pour le déploiement (Render, Railway, Heroku, VPS...)

## 📁 Structure du projet
```
portfolio-email-api/
├── src/
│   ├── index.js                  # Point d'entrée
│   ├── config/
│   │   └── email.config.js       # Configuration SMTP
│   ├── controllers/
│   │   └── email.controller.js   # Logique d'envoi
│   ├── routes/
│   │   └── email.routes.js       # Routes API
│   └── templates/
│       └── contact.template.js   # Templates HTML emails
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Installation

### 1. Cloner le repository
```bash
git clone https://github.com/ton-username/portfolio-email-api.git
cd portfolio-email-api
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer les variables d'environnement
```bash
cp .env.example .env
```

Puis édite le fichier `.env` :
```env
PORT=5000
GMAIL_USER=ton-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
RECIPIENT_EMAIL=ou-tu-recois@gmail.com
```

### 4. Configurer Gmail

⚠️ **Important** : Tu dois créer un "Mot de passe d'application" Gmail.

1. Va sur [Google Account Security](https://myaccount.google.com/security)
2. Active la **validation en 2 étapes**
3. Va dans **"Mots de passe des applications"**
4. Crée un nouveau mot de passe pour "Autre" → "Portfolio API"
5. Copie le code de 16 caractères dans ton `.env`

### 5. Lancer le serveur
```bash
# Mode développement (avec hot reload)
npm run dev

# Mode production
npm start
```

## 📖 API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### `GET /`

Informations sur l'API.

**Réponse :**
```json
{
  "message": "🚀 Portfolio Email API",
  "version": "1.0.0",
  "endpoints": {
    "health": "GET /api/health",
    "sendEmail": "POST /api/send-email"
  }
}
```

---

#### `GET /api/health`

Vérifier que l'API fonctionne.

**Réponse :**
```json
{
  "success": true,
  "message": "API opérationnelle 🚀",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

#### `POST /api/send-email`

Envoyer un email de contact.

**Headers :**
```
Content-Type: application/json
```

**Body :**
```json
{
  "nom": "John Doe",
  "email": "john@example.com",
  "telephone": "+221 77 123 45 67",
  "objet": "Proposition de collaboration",
  "message": "Bonjour, je souhaite discuter d'un projet..."
}
```

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| `nom` | string | ✅ | Nom complet de l'expéditeur |
| `email` | string | ✅ | Email de l'expéditeur |
| `telephone` | string | ❌ | Numéro de téléphone |
| `objet` | string | ❌ | Objet du message |
| `message` | string | ✅ | Contenu du message |

**Réponse succès (200) :**
```json
{
  "success": true,
  "message": "Email envoyé avec succès !"
}
```

**Réponse erreur (400) :**
```json
{
  "success": false,
  "error": "Les champs nom, email et message sont requis"
}
```

**Réponse erreur (500) :**
```json
{
  "success": false,
  "error": "Erreur lors de l'envoi de l'email"
}
```

## 💻 Exemple d'utilisation (Frontend React)
```javascript
const handleSubmit = async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      alert('Message envoyé !');
    } else {
      alert('Erreur : ' + data.error);
    }
  } catch (error) {
    console.error('Erreur:', error);
  }
};
```

## 🚀 Déploiement

### Render

1. Connecte ton repo GitHub à [Render](https://render.com)
2. Crée un nouveau "Web Service"
3. Configure les variables d'environnement
4. Deploy !

### Railway

1. Connecte ton repo à [Railway](https://railway.app)
2. Ajoute les variables d'environnement
3. Deploy automatique !

### VPS (Ubuntu)
```bash
# Installer Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Cloner et installer
git clone https://github.com/ton-username/portfolio-email-api.git
cd portfolio-email-api
npm install

# Utiliser PM2 pour garder le serveur actif
npm install -g pm2
pm2 start src/index.js --name "email-api"
pm2 save
pm2 startup
```

## 🔧 Configuration CORS (Production)

Pour la production, modifie `src/index.js` pour restreindre les origines :
```javascript
app.use(cors({
  origin: ['https://ton-portfolio.com', 'https://www.ton-portfolio.com'],
  methods: ['GET', 'POST'],
}));
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésite pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add some AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👤 Auteur

**Glenn Leonard MOUNGOLO**

- GitHub: [@glenn2016](https://github.com/glenn2016)
- LinkedIn: [Glenn Leonard MOUNGOLO](https://sn.linkedin.com/in/glenn-leonard-moungolo-595639250)

---

⭐ Si ce projet t'a aidé, n'hésite pas à lui donner une étoile sur GitHub !