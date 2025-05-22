<?php
require_once 'config.php';
require_once 'database.php';

// Créer une instance de la base de données
$db = new Database();
$conn = $db->getConnection();

// Fonctions de test de mise à jour
function testAutoUpdate($conn) {
    try {
        // Créer une version de test
        $test_version = '1.0.0';
        
        // Vérifier si la table des versions existe
        $stmt = $conn->query("
            IF NOT EXISTS (SELECT * FROM sys.objects 
                         WHERE object_id = OBJECT_ID(N'[dbo].[Versions]') 
                         AND type in (N'U'))
            BEGIN
                CREATE TABLE [dbo].[Versions] (
                    [id] INT IDENTITY(1,1) NOT NULL,
                    [version] VARCHAR(50) NOT NULL,
                    [applied_at] DATETIME NOT NULL,
                    CONSTRAINT [PK_Versions] PRIMARY KEY CLUSTERED ([id] ASC)
                )
            END
        ");
        
        // Insérer la version de test
        $stmt = $conn->prepare("INSERT INTO Versions (version, applied_at) VALUES (?, ?)");
        $stmt->execute([$test_version, date('Y-m-d H:i:s')]);
        
        // Vérifier si la version a été insérée
        $stmt = $conn->query("SELECT version FROM Versions ORDER BY id DESC LIMIT 1");
        $result = $stmt->fetch();
        
        return [
            'success' => true,
            'version' => $result['version']
        ];
    } catch (Exception $e) {
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

function testRollback($conn) {
    try {
        // Démarrer une transaction
        $conn->beginTransaction();
        
        // Créer une table temporaire
        $stmt = $conn->query("CREATE TABLE #TempTable (id INT)");
        
        // Annuler la transaction
        $conn->rollBack();
        
        // Vérifier si la table a été supprimée
        $stmt = $conn->query("
            SELECT COUNT(*) as count 
            FROM sys.tables 
            WHERE name = '#TempTable'
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

// Tester la mise à jour
$update_result = testAutoUpdate($conn);

// Tester le rollback
$rollback_result = testRollback($conn);

// Résultat final
$result = [
    'auto_update' => $update_result,
    'rollback' => $rollback_result,
    'timestamp' => date('Y-m-d H:i:s')
];

// Afficher le résultat en JSON
echo json_encode($result, JSON_PRETTY_PRINT);
