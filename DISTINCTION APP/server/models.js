const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  }
});

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
}, {
  timestamps: true,
});

async function initAdmin() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    const admin = await User.findOne({ where: { username: 'Quentdvk' } });
    if (!admin) {
      const hash = await bcrypt.hash('3NAtiposy', 10);
      await User.create({ username: 'Quentdvk', password: hash, isAdmin: true });
      console.log('Compte administrateur créé : Quentdvk');
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    throw error;
  }
}

module.exports = { sequelize, User, initAdmin };
