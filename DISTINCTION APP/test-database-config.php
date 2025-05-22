<?php
// Configuration de base
$host = 'sql1003';
$db_name = 'db_ab928a_yekpondafe';
$db_user = 'db_ab928a_yekpondafe_admin';
$db_pass = '3NAtiposy@22.';
$db_port = 1433;

// Options PDO pour SQL Server
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
    PDO::SQLSRV_ATTR_DIRECT_QUERY => true,
    PDO::SQLSRV_ATTR_QUERY_TIMEOUT => 30,
    PDO::SQLSRV_ATTR_CONNECTION_TIMEOUT => 30,
    PDO::SQLSRV_ATTR_ENCRYPT => true,
    PDO::SQLSRV_ATTR_TRUST_SERVER_CERTIFICATE => true
];

// Fonction pour tester une configuration
function testConnection($host, $db_name, $db_user, $db_pass, $db_port, $options) {
    try {
        // Tester différentes configurations
        $configurations = [
            [
                'description' => 'Configuration standard',
                'dsn' => "sqlsrv:Server=$host,$db_port;Database=$db_name"
            ],
            [
                'description' => 'Configuration avec port 1433',
                'dsn' => "sqlsrv:Server=$host,1433;Database=$db_name"
            ],
            [
                'description' => 'Configuration avec port 1434',
                'dsn' => "sqlsrv:Server=$host,1434;Database=$db_name"
            ],
            [
                'description' => 'Configuration avec port 1433 et nom complet',
                'dsn' => "sqlsrv:Server=sql1003.site4now.net,1433;Database=$db_name"
            ]
        ];

        $results = [];
        foreach ($configurations as $config) {
            try {
                $conn = new PDO($config['dsn'], $db_user, $db_pass, $options);
                $stmt = $conn->query("SELECT 1");
                $stmt->fetch();
                $results[] = [
                    'success' => true,
                    'description' => $config['description'],
                    'message' => 'Connexion réussie'
                ];
            } catch (PDOException $e) {
                $results[] = [
                    'success' => false,
                    'description' => $config['description'],
                    'error' => $e->getMessage()
                ];
            }
        }
        
        return $results;
    } catch (Exception $e) {
        return [
            [
                'success' => false,
                'description' => 'Erreur générale',
                'error' => $e->getMessage()
            ]
        ];
    }
}

// Tester toutes les configurations
$results = testConnection($host, $db_name, $db_user, $db_pass, $db_port, $options);

// Afficher le résultat en JSON
echo json_encode([
    'configurations' => $results,
    'timestamp' => date('Y-m-d H:i:s')
], JSON_PRETTY_PRINT);
