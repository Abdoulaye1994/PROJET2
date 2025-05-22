<?php
require_once 'config.php';
require_once 'database.php';

// Créer une instance de la base de données
$db = new Database();
$conn = $db->getConnection();

// Fonctions de test de sauvegarde
function testBackup($conn) {
    try {
        // Créer un dossier pour les sauvegardes s'il n'existe pas
        $backup_dir = __DIR__ . '/backups';
        if (!file_exists($backup_dir)) {
            mkdir($backup_dir, 0777, true);
        }

        // Générer un nom de fichier unique
        $filename = $backup_dir . '/backup_' . date('Y-m-d_H-i-s') . '.sql';

        // Créer la requête de sauvegarde
        $sql = "BACKUP DATABASE [" . DB_NAME . "] TO DISK = N'$filename'";
        
        // Exécuter la sauvegarde
        $stmt = $conn->query($sql);
        
        // Vérifier si le fichier a été créé
        if (file_exists($filename)) {
            return [
                'success' => true,
                'backup_file' => $filename,
                'size' => filesize($filename)
            ];
        }
        
        return [
            'success' => false,
            'error' => 'Le fichier de sauvegarde n\'a pas été créé'
        ];
    } catch (Exception $e) {
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

function testRestore($conn, $backup_file) {
    try {
        // Créer la requête de restauration
        $sql = "RESTORE DATABASE [" . DB_NAME . "] FROM DISK = N'$backup_file'";
        
        // Exécuter la restauration
        $stmt = $conn->query($sql);
        
        return [
            'success' => true,
            'message' => 'Restauration réussie'
        ];
    } catch (Exception $e) {
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

// Tester la sauvegarde
$backup_result = testBackup($conn);

// Si la sauvegarde réussit, tester la restauration
$restore_result = null;
if ($backup_result['success']) {
    $restore_result = testRestore($conn, $backup_result['backup_file']);
}

// Résultat final
$result = [
    'backup' => $backup_result,
    'restore' => $restore_result,
    'timestamp' => date('Y-m-d H:i:s')
];

// Afficher le résultat en JSON
echo json_encode($result, JSON_PRETTY_PRINT);
