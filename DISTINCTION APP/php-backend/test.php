<?php
require_once 'config.php';
require_once 'database.php';

try {
    // Tester la connexion à la base de données
    $db = new Database();
    $conn = $db->getConnection();
    
    // Tester une requête simple
    $stmt = $conn->query("SELECT 1");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Créer la table Users si elle n'existe pas
    $sql = "
        IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U'))
        BEGIN
            CREATE TABLE Users (
                id INT IDENTITY(1,1) PRIMARY KEY,
                username NVARCHAR(255) NOT NULL UNIQUE,
                password NVARCHAR(255) NOT NULL,
                isAdmin BIT DEFAULT 0,
                createdAt DATETIME DEFAULT GETDATE(),
                updatedAt DATETIME DEFAULT GETDATE()
            )
        END
    ";
    $conn->exec($sql);
    
    // Créer un utilisateur de test
    $stmt = $conn->prepare("INSERT INTO Users (username, password, isAdmin) VALUES (?, ?, ?)");
    $stmt->execute(['test_user', 'test_password', 0]);
    
    // Vérifier la création de l'utilisateur
    $stmt = $conn->prepare("SELECT * FROM Users WHERE username = ?");
    $stmt->execute(['test_user']);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'message' => 'Test réussi !',
        'database' => [
            'connected' => true,
            'user_created' => $user !== false
        ]
    ]);
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
