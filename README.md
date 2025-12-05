# 📧 Portfolio Email API

Une API REST simple et efficace pour envoyer des emails depuis un formulaire de contact de portfolio. Construite avec Node.js, Express et Resend.

![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.x-blue?style=flat-square&logo=express)
![Resend](https://img.shields.io/badge/Resend-API-purple?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

## ✨ Fonctionnalités

- 📬 Envoi d'emails via Resend API
- ✅ Email de confirmation automatique à l'expéditeur
- 🎨 Templates HTML responsive et stylés
- 🔒 Validation des données
- 🚀 Prêt pour le déploiement (Railway, Render, Heroku, VPS...)

## 📁 Structure du projet
```
portfolio-email-api/
├── src/
│   ├── index.js                  # Point d'entrée
│   ├── config/
│   │   └── email.config.js       # Configuration Resend
│   ├── controllers/
│   │   └── email.controller.js   # Logique d'envoi
│   ├── routes/
│   │   └── email.routes.js       # Routes API
│   └── templates/
│       └── contact.template.js   # Templates HTML emails
├── .env.example
├── .env
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

### 3. Configurer Resend

1. Crée un compte sur [resend.com](https://resend.com)
2. Va dans **API Keys** → **Create API Key**
3. Copie ta clé API (commence par `re_`)

### 4. Configurer les variables d'environnement
```bash
cp .env.example .env
```

Puis édite le fichier `.env` :
```env
PORT=5000
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
RECIPIENT_EMAIL=ton-email@gmail.com
NODE_ENV=development
```

| Variable | Description |
|----------|-------------|
| `PORT` | Port du serveur (défaut: 5000) |
| `RESEND_API_KEY` | Ta clé API Resend |
| `RECIPIENT_EMAIL` | Email où tu reçois les messages |
| `NODE_ENV` | `development` ou `production` |

### 5. Lancer le serveur
```bash
# Mode développement (avec hot reload)
npm run dev

# Mode production
npm start
```

## 📖 API Documentation

### Base URL

**Local :**
```
http://localhost:5000
```

**Production (Railway) :**
```
https://ton-app.up.railway.app
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
    const response = await fetch('https://ton-api.up.railway.app/api/send-email', {
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

### Railway (Recommandé)

1. Connecte ton repo GitHub à [railway.app](https://railway.app)
2. Crée un nouveau projet → **Deploy from GitHub repo**
3. Ajoute les variables d'environnement :
   - `RESEND_API_KEY`
   - `RECIPIENT_EMAIL`
   - `NODE_ENV` = `production`
4. Génère un domaine dans **Settings** → **Networking** → **Generate Domain**

### Render

1. Connecte ton repo GitHub à [render.com](https://render.com)
2. Crée un **Web Service**
3. Configure :
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
4. Ajoute les variables d'environnement
5. Deploy !

### VPS (Ubuntu)
```bash
# Installer Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Cloner et installer
git clone https://github.com/ton-username/portfolio-email-api.git
cd portfolio-email-api
npm install

# Configurer les variables
cp .env.example .env
nano .env

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

## 📧 Personnaliser le domaine d'envoi (Optionnel)

Par défaut, les emails sont envoyés depuis `onboarding@resend.dev`. Pour utiliser ton propre domaine :

1. Va sur [resend.com/domains](https://resend.com/domains)
2. Ajoute ton domaine
3. Configure les DNS (SPF, DKIM)
4. Modifie le `from` dans `email.controller.js` :
```javascript
from: 'contact@ton-domaine.com'
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésite pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add some AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request


## 👤 Auteur

**Glenn Leonard MOUNGOLO**

- GitHub: [@glenn2016](https://github.com/glenn2016)
- LinkedIn: [Glenn Leonard MOUNGOLO](https://sn.linkedin.com/in/glenn-leonard-moungolo-595639250)

---

⭐ Si ce projet t'a aidé, n'hésite pas à lui donner une étoile sur GitHub !