<?php
require_once 'config.php';

try {
    // Configurations spécifiques pour SQL Server 2022
    $configurations = [
        [
            'description' => 'Configuration standard SQL Server 2022',
            'dsn' => "sqlsrv:Server=" . DB_HOST . "," . DB_PORT . ";Database=" . DB_NAME . ";TrustServerCertificate=true;Encrypt=true",
            'options' => [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::SQLSRV_ATTR_QUERY_TIMEOUT => 30,
                PDO::ATTR_TIMEOUT => 30,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::SQLSRV_ATTR_DIRECT_QUERY => true,
                PDO::SQLSRV_ATTR_ENCODING => PDO::SQLSRV_ENCODING_SYSTEM
            ]
        ],
        [
            'description' => 'Configuration avec UTF-8',
            'dsn' => "sqlsrv:Server=" . DB_HOST . "," . DB_PORT . ";Database=" . DB_NAME . ";TrustServerCertificate=true;Encrypt=true;CharacterSet=UTF-8",
            'options' => [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::SQLSRV_ATTR_QUERY_TIMEOUT => 30,
                PDO::ATTR_TIMEOUT => 30,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::SQLSRV_ATTR_DIRECT_QUERY => true,
                PDO::SQLSRV_ATTR_ENCODING => PDO::SQLSRV_ENCODING_SYSTEM
            ]
        ],
        [
            'description' => 'Configuration avec timeout étendu',
            'dsn' => "sqlsrv:Server=" . DB_HOST . "," . DB_PORT . ";Database=" . DB_NAME . ";TrustServerCertificate=true;Encrypt=true",
            'options' => [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::SQLSRV_ATTR_QUERY_TIMEOUT => 60,
                PDO::ATTR_TIMEOUT => 60,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::SQLSRV_ATTR_DIRECT_QUERY => true,
                PDO::SQLSRV_ATTR_ENCODING => PDO::SQLSRV_ENCODING_SYSTEM
            ]
        ]
    ];

    $results = [];
    foreach ($configurations as $config) {
        try {
            $conn = new PDO($config['dsn'], DB_USER, DB_PASS, $config['options']);
            
            // Vérifier la version du serveur
            $stmt = $conn->query("SELECT @@VERSION as version");
            $serverInfo = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Vérifier les permissions
            $stmt = $conn->query("SELECT IS_SRVROLEMEMBER('sysadmin') as isAdmin");
            $permissions = $stmt->fetch(PDO::FETCH_ASSOC);
            
            $results[] = [
                'success' => true,
                'description' => $config['description'],
                'details' => [
                    'server_version' => $serverInfo['version'],
                    'is_admin' => $permissions['isAdmin']
                ]
            ];
            
        } catch (PDOException $e) {
            $results[] = [
                'success' => false,
                'description' => $config['description'],
                'error' => $e->getMessage()
            ];
        }
    }

    echo json_encode($results, JSON_PRETTY_PRINT);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}
