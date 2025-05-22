<?php
// Configuration FTP
$ftp_config = [
    'host' => 'ftp.site4now.net',
    'port' => 21,
    'username' => 'votre_username_ftp',
    'password' => 'votre_mot_de_passe_ftp',
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

// Vérifier les permissions
$permissions = [
    'write' => false,
    'read' => false,
    'upload' => false,
    'delete' => false,
    'mkdir' => false
];

// Tester la lecture
if ($files = ftp_nlist($conn_id, $ftp_config['path'])) {
    $permissions['read'] = true;
}

// Tester l'écriture
touch('test.txt');
if (ftp_put($conn_id, 'test.txt', 'test.txt', FTP_ASCII)) {
    $permissions['write'] = true;
    $permissions['upload'] = true;
    
    // Tester la suppression
    if (ftp_delete($conn_id, 'test.txt')) {
        $permissions['delete'] = true;
    }
}

// Tester la création de dossier
if (ftp_mkdir($conn_id, 'test-dir')) {
    $permissions['mkdir'] = true;
    ftp_rmdir($conn_id, 'test-dir');
}

// Fermer la connexion
ftp_close($conn_id);

// Résultat
echo json_encode([
    'success' => true,
    'permissions' => $permissions,
    'message' => 'Test des permissions FTP terminé'
], JSON_PRETTY_PRINT);
