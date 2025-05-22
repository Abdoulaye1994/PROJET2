<?php
require_once 'config.php';
require_once 'database.php';

// Créer une instance de la base de données
$db = new Database();
$conn = $db->getConnection();

// Fonctions de test de migration
function testMigration($conn) {
    try {
        // Créer une table de test
        $stmt = $conn->query("
            CREATE TABLE TestMigration (
                id INT IDENTITY(1,1) PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                created_at DATETIME NOT NULL
            )
        ");
        
        // Insérer des données de test
        $stmt = $conn->prepare("INSERT INTO TestMigration (name, created_at) VALUES (?, ?)");
        $stmt->execute(['Test Migration', date('Y-m-d H:i:s')]);
        
        // Vérifier si les données ont été insérées
        $stmt = $conn->query("SELECT COUNT(*) as count FROM TestMigration");
        $result = $stmt->fetch();
        
        return [
            'success' => true,
            'row_count' => $result['count']
        ];
    } catch (Exception $e) {
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

function testMigrationRollback($conn) {
    try {
        // Démarrer une transaction
        $conn->beginTransaction();
        
        // Créer une table temporaire
        $stmt = $conn->query("
            CREATE TABLE TempMigration (
                id INT IDENTITY(1,1) PRIMARY KEY,
                name VARCHAR(100) NOT NULL
            )
        ");
        
        // Annuler la transaction
        $conn->rollBack();
        
        // Vérifier si la table a été supprimée
        $stmt = $conn->query("
            SELECT COUNT(*) as count 
            FROM sys.tables 
            WHERE name = 'TempMigration'
        ");
        $result = $stmt->fetch();
        
        return [
            'success' => true,
            'table_exists' => $result['count'] > 0
        ];
    } catch (Exception $e) {
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

// Tester la migration
$migration_result = testMigration($conn);

// Tester le rollback de la migration
$rollback_result = testMigrationRollback($conn);

// Résultat final
$result = [
    'migration' => $migration_result,
    'rollback' => $rollback_result,
    'timestamp' => date('Y-m-d H:i:s')
];

// Afficher le résultat en JSON
echo json_encode($result, JSON_PRETTY_PRINT);
