<?php
require_once 'config.php';

$tests = [
    [
        'description' => 'Configuration standard',
        'dsn' => "sqlsrv:Server=" . DB_HOST . "," . DB_PORT . ";Database=" . DB_NAME,
        'options' => [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    ],
    [
        'description' => 'Configuration avec TrustServerCertificate',
        'dsn' => "sqlsrv:Server=" . DB_HOST . "," . DB_PORT . ";Database=" . DB_NAME . ";TrustServerCertificate=true",
        'options' => [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    ],
    [
        'description' => 'Configuration avec Encrypt',
        'dsn' => "sqlsrv:Server=" . DB_HOST . "," . DB_PORT . ";Database=" . DB_NAME . ";Encrypt=true",
        'options' => [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    ],
    [
        'description' => 'Configuration complète',
        'dsn' => "sqlsrv:Server=" . DB_HOST . "," . DB_PORT . ";Database=" . DB_NAME . ";TrustServerCertificate=true;Encrypt=true",
        'options' => [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::SQLSRV_ATTR_QUERY_TIMEOUT => 30,
            PDO::ATTR_TIMEOUT => 30,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    ]
];

$results = [];
foreach ($tests as $test) {
    try {
        $conn = new PDO($test['dsn'], DB_USER, DB_PASS, $test['options']);
        $results[] = [
            'success' => true,
            'description' => $test['description'],
            'message' => 'Connexion réussie'
        ];
        
        // Tester une requête simple
        $stmt = $conn->query("SELECT 1");
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($result) {
            $results[] = [
                'success' => true,
                'description' => $test['description'] . ' - Test requête',
                'message' => 'Requête réussie'
            ];
        }
        
    } catch (PDOException $e) {
        $results[] = [
            'success' => false,
            'description' => $test['description'],
            'message' => $e->getMessage()
        ];
    }
}

echo json_encode($results, JSON_PRETTY_PRINT);
