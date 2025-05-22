const fs = require('fs').promises;
const path = require('path');

async function prepareDeployment() {
  try {
    // Créer le dossier de déploiement
    const deployDir = path.join(__dirname, 'deploy');
    await fs.mkdir(deployDir, { recursive: true });

    // Préparer le frontend
    console.log('Compilant le frontend...');
    const frontendDir = path.join(__dirname, 'frontend');
    const buildDir = path.join(frontendDir, 'build');
    
    // Copier les fichiers du frontend
    console.log('Copie des fichiers frontend...');
    await fs.cp(buildDir, path.join(deployDir, 'public'), { recursive: true });

    // Préparer le backend
    console.log('Préparation du backend...');
    const serverDir = path.join(__dirname, 'server');
    
    // Copier les fichiers nécessaires du backend
    const filesToCopy = [
      'server.js',
      'models.js',
      '.env',
      'package.json',
      'package-lock.json'
    ];

    for (const file of filesToCopy) {
      await fs.copyFile(
        path.join(serverDir, file),
        path.join(deployDir, file)
      );
    }

    // Créer un fichier README pour le déploiement
    const readmeContent = `
    Instructions de déploiement pour DISTINCTION APP

    1. Configuration du serveur :
    - Assurez-vous que Node.js est installé
    - Installez les dépendances : npm install
    - Configurez le proxy pour rediriger les requêtes API vers le port 5000

    2. Structure des fichiers :
    - public/ : contient les fichiers frontend
    - server/ : contient les fichiers backend
    - .env : fichier de configuration (doit être créé avec les bonnes informations)

    3. Base de données :
    - Host: SQL1003.site4now.net
    - Database: db_ab928a_yekpondafe
    - User: db_ab928a_yekpondafe_admin
    - Password: 3NAtiposy@22.
    - Port: 1433

    4. Pour démarrer le serveur :
    - Dans le dossier server : npm start
    `;

    await fs.writeFile(path.join(deployDir, 'README.md'), readmeContent);

    console.log('Préparation du déploiement terminée !');
    console.log('Les fichiers sont prêts dans le dossier:', deployDir);

  } catch (error) {
    console.error('Erreur lors de la préparation du déploiement:', error);
  }
}

prepareDeployment();
