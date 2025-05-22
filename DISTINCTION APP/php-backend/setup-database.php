<?php
require_once 'config.php';
require_once 'database.php';

try {
    // Créer une connexion sans spécifier la base de données
    $db = new Database();
    $conn = $db->getConnection();
    
    // Créer la base de données si elle n'existe pas
    $sql = "
        IF NOT EXISTS (
            SELECT name 
            FROM sys.databases 
            WHERE name = N'" . DB_NAME . "'
        )
        BEGIN
            CREATE DATABASE " . DB_NAME . ";
        END;
    ";
    
    $conn->exec($sql);
    
    // Changer la base de données
    $conn->exec("USE " . DB_NAME);
    
    // Créer la table Users
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
        END;
    ";
    $conn->exec($sql);
    
    // Créer un utilisateur admin par défaut
    $sql = "
        IF NOT EXISTS (SELECT * FROM Users WHERE username = 'admin')
        BEGIN
            INSERT INTO Users (username, password, isAdmin) 
            VALUES ('admin', 'admin123', 1)
        END;
    ";
    $conn->exec($sql);
    
    // Créer la table Transactions
    $sql = "
        IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Transactions]') AND type in (N'U'))
        BEGIN
            CREATE TABLE Transactions (
                id INT IDENTITY(1,1) PRIMARY KEY,
                type NVARCHAR(50) NOT NULL,
                amount DECIMAL(10,2) NOT NULL,
                description NVARCHAR(255),
                date DATETIME DEFAULT GETDATE(),
                userId INT FOREIGN KEY REFERENCES Users(id)
            )
        END;
    ";
    $conn->exec($sql);
    
    echo json_encode([
        'success' => true,
        'message' => 'Base de données configurée avec succès !',
        'tables' => [
            'Users' => 'Créée avec succès',
            'Transactions' => 'Créée avec succès'
        ]
    ], JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}
