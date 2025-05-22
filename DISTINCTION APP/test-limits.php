<?php
require_once 'config.php';
require_once 'database.php';

// Créer une instance de la base de données
$db = new Database();
$conn = $db->getConnection();

// Tests des limites
$tests = [
    'max_rows' => function($conn) {
        try {
            // Insérer 1000 lignes
            $stmt = $conn->prepare("INSERT INTO Transactions (user_id, amount, description) VALUES (?, ?, ?)");
            $user_id = 1;
            for ($i = 0; $i < 1000; $i++) {
                $amount = rand(1, 1000) / 100;
                $description = "Test transaction $i";
                $stmt->execute([$user_id, $amount, $description]);
            }
            return [
                'success' => true,
                'message' => '1000 lignes insérées avec succès'
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    },
    'max_query_size' => function($conn) {
        try {
            // Créer une requête avec une grande chaîne
            $long_string = str_repeat('a', 1000000);
            $stmt = $conn->prepare("INSERT INTO Transactions (description) VALUES (?)");
            $stmt->execute([$long_string]);
            return [
                'success' => true,
                'message' => 'Requête avec grande chaîne réussie'
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    },
    'max_connections' => function($conn) {
        try {
            // Créer 10 connexions simultanées
            $connections = [];
            for ($i = 0; $i < 10; $i++) {
                $dsn = "sqlsrv:Server=" . DB_HOST . "," . DB_PORT . ";Database=" . DB_NAME;
                $connections[] = new PDO($dsn, DB_USER, DB_PASS);
            }
            return [
                'success' => true,
                'message' => '10 connexions simultanées réussies'
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
];

// Exécuter les tests
$result = [];
foreach ($tests as $name => $test) {
    $result[$name] = $test($conn);
}

// Afficher le résultat en JSON
echo json_encode([
    'limits' => $result,
    'timestamp' => date('Y-m-d H:i:s')
], JSON_PRETTY_PRINT);
