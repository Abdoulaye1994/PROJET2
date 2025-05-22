<?php
// Configuration FTP
$ftp_host = 'ftp.yekpondafe-001-site1.ptempurl.com';
$ftp_port = 21;
$ftp_user = 'votre_username_ftp';
$ftp_pass = 'votre_mot_de_passe_ftp';

// Connexion FTP
$conn_id = ftp_connect($ftp_host, $ftp_port);
if (!$conn_id) {
    die(json_encode([
        'success' => false,
        'error' => 'Impossible de se connecter au serveur FTP'
    ], JSON_PRETTY_PRINT));
}

// Authentification
$login_result = ftp_login($conn_id, $ftp_user, $ftp_pass);
if (!$login_result) {
    die(json_encode([
        'success' => false,
        'error' => 'Authentification échouée'
    ], JSON_PRETTY_PRINT));
}

// Vérifier les permissions
$permissions = [
    'write' => ftp_mkdir($conn_id, 'test') && ftp_rmdir($conn_id, 'test'),
    'read' => ftp_nlist($conn_id, '.') !== false,
    'upload' => ftp_put($conn_id, 'test.txt', __FILE__, FTP_ASCII) && ftp_delete($conn_id, 'test.txt')
];

// Fermer la connexion
ftp_close($conn_id);

// Résultat
echo json_encode([
    'success' => true,
    'permissions' => $permissions,
    'message' => 'Connexion FTP réussie'
], JSON_PRETTY_PRINT);
