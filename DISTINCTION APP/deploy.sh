#!/bin/bash

# Créer le dossier de déploiement
mkdir -p deploy/public deploy/php-backend

echo "Copie des fichiers frontend..."
cp -r frontend/build/* deploy/public/

echo "Copie des fichiers PHP..."
cp php-backend/* deploy/php-backend/

echo "Création de la documentation..."

# Créer la documentation
cat > deploy/README.md << EOL
# Instructions de déploiement pour DISTINCTION APP

## Structure des fichiers

```
/ (racine)
├── public/        # Contenu du frontend
│   ├── index.html
│   ├── static/
│   └── ...
└── php-backend/   # Backend PHP
    ├── config.php
    ├── database.php
    ├── auth.php
    ├── api.php
    └── index.php
```

## Configuration du serveur

1. Base de données MSSQL
   - Host: SQL1003.site4now.net
   - Database: db_ab928a_yekpondafe
   - User: db_ab928a_yekpondafe_admin
   - Password: 3NAtiposy@22.
   - Port: 1433

2. PHP Configuration
   - Assurez-vous que PHP est activé
   - Activez les extensions PDO et sqlsrv

3. Domaine
   - Configurez le domaine pour pointer vers le dossier public
   - Assurez-vous que les requêtes API sont redirigées vers php-backend

## Tests avant déploiement

1. Testez la connexion à la base de données
2. Testez les routes API
3. Testez l\'authentification

## Déploiement via FTP

1. Connectez-vous à votre FTP
2. Créez les dossiers public et php-backend
3. Copiez les fichiers du dossier deploy/public vers public/
4. Copiez les fichiers du dossier deploy/php-backend vers php-backend/

## Vérification

1. Accédez à votre site via le navigateur
2. Testez toutes les fonctionnalités
3. Vérifiez les logs d\'erreur

## Support

Si vous rencontrez des problèmes, vérifiez :
1. Les logs PHP
2. Les logs de la base de données
3. Les permissions des fichiers
4. La configuration du proxy

EOL

echo "Préparation du déploiement terminée !"
echo "Les fichiers sont prêts dans le dossier deploy/"
echo "Vous pouvez maintenant utiliser FileZilla pour déployer les fichiers"
