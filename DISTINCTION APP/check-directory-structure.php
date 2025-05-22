<?php
// Configuration FTP
$ftp_config = [
    'host' => 'ftp.site4now.net',
    'port' => 21,
    'username' => 'yekpondafe-001',
    'password' => 'votre_mot_de_passe_principal',
    'path' => '/site1'
];

// Connexion FTP
$conn_id = ftp_connect($ftp_config['host'], $ftp_config['port']);
if (!$conn_id) {
    die(json_encode([
        'success' => false,
        'error' => 'Impossible de se connecter au serveur FTP'
    ], JSON_PRETTY_PRINT));
}

// Authentification
if (!ftp_login($conn_id, $ftp_config['username'], $ftp_config['password'])) {
    die(json_encode([
        'success' => false,
        'error' => 'Authentification échouée'
    ], JSON_PRETTY_PRINT));
}

// Vérifier la structure des dossiers
$required_directories = [
    'frontend',
    'php-backend'
];

$existing_directories = ftp_nlist($conn_id, $ftp_config['path']);
$missing_directories = [];

foreach ($required_directories as $dir) {
    if (!in_array($dir, $existing_directories)) {
        $missing_directories[] = $dir;
    }
}

// Créer les dossiers manquants
foreach ($missing_directories as $dir) {
    if (ftp_mkdir($conn_id, $ftp_config['path'] . '/' . $dir)) {
        echo "Dossier $dir créé avec succès\n";
    } else {
        echo "Impossible de créer le dossier $dir\n";
    }
}

// Vérifier les fichiers dans php-backend
if (in_array('php-backend', $existing_directories)) {
    $php_backend_files = ftp_nlist($conn_id, $ftp_config['path'] . '/php-backend');
    $required_files = [
        'config.php',
        'database.php',
        'auth.php',
        'index.php'
    ];
    
    $missing_files = [];
    foreach ($required_files as $file) {
        if (!in_array($file, $php_backend_files)) {
            $missing_files[] = $file;
        }
    }
}

// Fermer la connexion
ftp_close($conn_id);

// Résultat
echo json_encode([
    'success' => true,
    'directories' => [
        'existing' => $existing_directories,
        'missing' => $missing_directories
    ],
    'files' => isset($missing_files) ? [
        'missing' => $missing_files
    ] : null,
    'message' => 'Vérification de la structure terminée'
], JSON_PRETTY_PRINT);
