<?php
require_once 'config.php';

try {
    // Tester différentes combinaisons de paramètres
    $tests = [
        [
            'description' => 'Configuration avec chemin complet',
            'dsn' => "sqlsrv:Server=" . DB_HOST . "," . DB_PORT . ";Database=" . DB_NAME . ";TrustServerCertificate=true;Encrypt=true;AttachDBFileName=H:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\db_ab928a_yekpondafe_DATA.mdf",
            'options' => DB_OPTIONS
        ],
        [
            'description' => 'Configuration avec nom de fichier',
            'dsn' => "sqlsrv:Server=" . DB_HOST . "," . DB_PORT . ";Database=" . DB_NAME . ";TrustServerCertificate=true;Encrypt=true;AttachDBFileName=db_ab928a_yekpondafe_DATA.mdf",
            'options' => DB_OPTIONS
        ],
        [
            'description' => 'Configuration avec nom simple',
            'dsn' => "sqlsrv:Server=" . DB_HOST . "," . DB_PORT . ";Database=" . DB_NAME . ";TrustServerCertificate=true;Encrypt=true",
            'options' => DB_OPTIONS
        ]
    ];

    $results = [];
    foreach ($tests as $test) {
        try {
            $conn = new PDO($test['dsn'], DB_USER, DB_PASS, $test['options']);
            
            // Vérifier la connexion
            $stmt = $conn->query("SELECT 1");
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            
            $results[] = [
                'success' => true,
                'description' => $test['description'],
                'message' => 'Connexion réussie'
            ];
            
        } catch (PDOException $e) {
            $results[] = [
                'success' => false,
                'description' => $test['description'],
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
