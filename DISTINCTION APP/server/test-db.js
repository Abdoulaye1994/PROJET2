const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const sequelize = new Sequelize('db_ab928a_yekpondafe', 'db_ab928a_yekpondafe_admin', '3NAtiposy@22.', {
  host: 'SQL1003.site4now.net',
  port: 1433,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  }
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie !');
    
    // Créer la table User si elle n'existe pas
    const User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });

    await sequelize.sync();
    console.log('Tables créées avec succès !');

    // Créer un utilisateur de test
    const hash = await bcrypt.hash('test123', 10);
    await User.create({ username: 'test', password: hash, isAdmin: false });
    console.log('Utilisateur de test créé avec succès !');

  } catch (error) {
    console.error('Erreur lors de la connexion à la base de données:', error);
    process.exit(1);
  }
}

testConnection();
