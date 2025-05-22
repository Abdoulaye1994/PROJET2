<?php
// Configuration FTP
$configurations = [
    [
        'description' => 'Configuration standard',
        'host' => 'ftp.site4now.net',
        'port' => 21,
        'username' => 'yekpondafe-001-site1',
        'password' => 'votre_mot_de_passe_ftp',
        'mode' => FTP_PASSIVE
    ],
    [
        'description' => 'Configuration SFTP',
        'host' => 'ftp.site4now.net',
        'port' => 22,
        'username' => 'yekpondafe-001-site1',
        'password' => 'votre_mot_de_passe_ftp',
        'mode' => FTP_AUTO
    ],
    [
        'description' => 'Configuration avec domaine',
        'host' => 'ftp.yekpondafe-001-site1.ptempurl.com',
        'port' => 21,
        'username' => 'yekpondafe-001-site1',
        'password' => 'votre_mot_de_passe_ftp',
        'mode' => FTP_PASSIVE
    ]
];

$results = [];
foreach ($configurations as $config) {
    try {
        // Connexion FTP
        $conn_id = ftp_connect($config['host'], $config['port']);
        if (!$conn_id) {
            throw new Exception('Impossible de se connecter au serveur');
        }

        // Authentification
        $login_result = ftp_login($conn_id, $config['username'], $config['password']);
        if (!$login_result) {
            throw new Exception('Authentification échouée');
        }

        // Vérifier le mode de transfert
        if (!ftp_pasv($conn_id, $config['mode'] === FTP_PASSIVE)) {
            throw new Exception('Impossible de définir le mode de transfert');
        }

        // Tester la lecture des fichiers
        $files = ftp_nlist($conn_id, '.');
        if ($files === false) {
            throw new Exception('Impossible de lister les fichiers');
        }

        $results[] = [
            'success' => true,
            'description' => $config['description'],
            'message' => 'Connexion réussie',
            'files' => $files
        ];

        // Fermer la connexion
        ftp_close($conn_id);

    } catch (Exception $e) {
        $results[] = [
            'success' => false,
            'description' => $config['description'],
            'error' => $e->getMessage()
        ];
    }
}

echo json_encode($results, JSON_PRETTY_PRINT);
