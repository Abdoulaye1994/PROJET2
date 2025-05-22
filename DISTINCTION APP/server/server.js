const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, initAdmin } = require('./models');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'distinction_secret_key';
const DOMAIN = 'http://yekpondafe-001-site1.ptempurl.com';

// Configuration CORS pour permettre les requêtes depuis le domaine
app.use(cors({
  origin: DOMAIN,
  credentials: true
}));

app.use(express.json());

// Création auto du compte admin au démarrage
initAdmin();

// Middleware d'authentification JWT
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token manquant' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token invalide' });
    req.user = user;
    next();
  });
}

// Route test
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Bienvenue sur DISTINCTION APP !' });
});

// Vérification de la connexion à la base de données
app.get('/api/check-db', async (req, res) => {
  try {
    await User.findOne();
    res.json({ success: true, message: 'Base de données connectée avec succès' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Inscription
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Champs requis' });
  const exists = await User.findOne({ where: { username } });
  if (exists) return res.status(409).json({ error: 'Utilisateur déjà existant' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hash, isAdmin: false });
  res.json({ id: user.id, username: user.username });
});

// Connexion
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(401).json({ error: 'Identifiants invalides' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Identifiants invalides' });
  const token = jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user: { id: user.id, username: user.username, isAdmin: user.isAdmin } });
});

// Liste des utilisateurs (admin uniquement)
app.get('/api/users', authMiddleware, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Accès refusé' });
  const users = await User.findAll({ attributes: ['id', 'username', 'isAdmin', 'createdAt'] });
  res.json(users);
});

// Suppression utilisateur (admin uniquement)
app.delete('/api/users/:id', authMiddleware, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Accès refusé' });
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
  await user.destroy();
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
  console.log('Configuration du serveur :');
  console.log(`Domaine: ${DOMAIN}`);
  console.log(`Port: ${PORT}`);
  console.log('Configuration de base de données :');
  console.log(`Host: ${process.env.DB_HOST}`);
  console.log(`Database: ${process.env.DB_NAME}`);
});
