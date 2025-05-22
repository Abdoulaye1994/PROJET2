<?php
require_once 'config.php';

try {
    // Configuration spécifique pour la création de l'utilisateur
    $dsn = "sqlsrv:Server=" . DB_HOST . "," . DB_PORT . ";TrustServerCertificate=true;Encrypt=true";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::SQLSRV_ATTR_QUERY_TIMEOUT => 30,
        PDO::ATTR_TIMEOUT => 30,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::SQLSRV_ATTR_DIRECT_QUERY => true,
        PDO::SQLSRV_ATTR_ENCODING => PDO::SQLSRV_ENCODING_SYSTEM
    ];

    // Connexion au serveur SQL
    $conn = new PDO($dsn, DB_USER, DB_PASS, $options);
    
    // Créer l'utilisateur avec les droits nécessaires
    $sql = "
        USE master;
        IF NOT EXISTS (SELECT name FROM sys.server_principals WHERE name = N'" . DB_USER . "')
        BEGIN
            CREATE LOGIN [" . DB_USER . "] WITH PASSWORD = N'" . DB_PASS . "', DEFAULT_DATABASE = [" . DB_NAME . "];
        END;

        USE [" . DB_NAME . "];
        IF NOT EXISTS (SELECT name FROM sys.database_principals WHERE name = N'" . DB_USER . "')
        BEGIN
            CREATE USER [" . DB_USER . "] FOR LOGIN [" . DB_USER . "];
            ALTER ROLE [db_owner] ADD MEMBER [" . DB_USER . "];
            ALTER ROLE [db_datareader] ADD MEMBER [" . DB_USER . "];
            ALTER ROLE [db_datawriter] ADD MEMBER [" . DB_USER . "];
        END;

        -- Vérifier les permissions
        SELECT 
            IS_SRVROLEMEMBER('sysadmin') as is_sysadmin,
            IS_MEMBER('db_owner') as is_db_owner,
            IS_MEMBER('db_datareader') as is_datareader,
            IS_MEMBER('db_datawriter') as is_datawriter
    ";

    // Exécuter les commandes
    $stmt = $conn->query($sql);
    $permissions = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'message' => 'Utilisateur créé avec succès',
        'permissions' => $permissions
    ], JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}
