<?php
require_once 'config.php';
require_once 'database.php';

// Créer une instance de la base de données
$db = new Database();
$conn = $db->getConnection();

// Fonction pour tester les logs
function testLogs($conn) {
    try {
        // Créer un fichier de log
        $log_file = __DIR__ . '/logs/app.log';
        
        // Écrire différents types de logs
        error_log("Test d'erreur PHP", 3, $log_file);
        
        // Créer une erreur intentionnelle pour tester les logs PHP
        trigger_error("Erreur test", E_USER_WARNING);
        
        // Créer une erreur SQL pour tester les logs SQL
        try {
            $stmt = $conn->query("SELECT * FROM table_inexistante");
        } catch (Exception $e) {
            error_log("Erreur SQL: " . $e->getMessage(), 3, $log_file);
        }
        
        // Vérifier si le fichier de log existe
        if (file_exists($log_file)) {
            $log_content = file_get_contents($log_file);
            return [
                'success' => true,
                'log_file' => $log_file,
                'log_content' => $log_content
            ];
        }
        
        return [
            'success' => false,
            'error' => 'Le fichier de log n\'a pas été créé'
        ];
    } catch (Exception $e) {
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

// Créer le dossier logs s'il n'existe pas
if (!file_exists(__DIR__ . '/logs')) {
    mkdir(__DIR__ . '/logs', 0777, true);
}

// Tester les logs
$result = testLogs($conn);

// Afficher le résultat en JSON
echo json_encode($result, JSON_PRETTY_PRINT);
