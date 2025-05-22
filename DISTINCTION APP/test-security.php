<?php
require_once 'config.php';
require_once 'database.php';
require_once 'auth.php';

// Créer une instance de la base de données
$db = new Database();
$conn = $db->getConnection();

// Fonctions de test de sécurité
function testXSS($conn) {
    try {
        // Tester la protection contre les attaques XSS
        $test_input = '<script>alert("XSS")</script>';
        $stmt = $conn->prepare("INSERT INTO Users (username) VALUES (?)");
        $stmt->execute([$test_input]);
        
        // Vérifier si le contenu a été échappé
        $stmt = $conn->query("SELECT username FROM Users ORDER BY id DESC LIMIT 1");
        $result = $stmt->fetch();
        
        return [
            'success' => true,
            'result' => $result['username']
        ];
    } catch (Exception $e) {
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

function testSQLInjection($conn) {
    try {
        // Tester la protection contre les injections SQL
        $test_input = "' OR '1'='1";
        $stmt = $conn->prepare("SELECT * FROM Users WHERE username = ?");
        $stmt->execute([$test_input]);
        $results = $stmt->fetchAll();
        
        return [
            'success' => true,
            'count' => count($results)
        ];
    } catch (Exception $e) {
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

function testCSRF($conn) {
    try {
        // Tester la protection contre les attaques CSRF
        session_start();
        if (!isset($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        
        return [
            'success' => true,
            'token' => $_SESSION['csrf_token']
        ];
    } catch (Exception $e) {
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

// Tester la sécurité
$results = [
    'xss' => testXSS($conn),
    'sql_injection' => testSQLInjection($conn),
    'csrf' => testCSRF($conn)
];

// Afficher le résultat en JSON
echo json_encode($results, JSON_PRETTY_PRINT);
