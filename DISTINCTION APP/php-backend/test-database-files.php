<?php
require_once 'config.php';

try {
    // Configuration spécifique pour cette base de données
    $dsn = "sqlsrv:Server=" . DB_HOST . "," . DB_PORT . ";Database=" . DB_NAME . ";TrustServerCertificate=true;Encrypt=true";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::SQLSRV_ATTR_QUERY_TIMEOUT => 30,
        PDO::ATTR_TIMEOUT => 30,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::SQLSRV_ATTR_DIRECT_QUERY => true,
        PDO::SQLSRV_ATTR_ENCODING => PDO::SQLSRV_ENCODING_SYSTEM
    ];

    // Connexion à la base de données
    $conn = new PDO($dsn, DB_USER, DB_PASS, $options);

    // Vérifier les fichiers de la base de données
    $stmt = $conn->query("SELECT 
        name as filename,
        physical_name,
        size * 8 / 1024 as size_mb,
        max_size * 8 / 1024 as max_size_mb,
        growth,
        is_percent_growth,
        type_desc
    FROM sys.database_files");
    
    $files = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Vérifier l'espace disponible
    $stmt = $conn->query("SELECT 
        CAST(SUM(size) * 8 / 1024 AS DECIMAL(36, 2)) as total_space_mb,
        CAST(SUM(CAST(FILEPROPERTY(name, 'SpaceUsed') AS INT)) * 8 / 1024 AS DECIMAL(36, 2)) as used_space_mb,
        CAST(SUM(size) * 8 / 1024 - SUM(CAST(FILEPROPERTY(name, 'SpaceUsed') AS INT)) * 8 / 1024 AS DECIMAL(36, 2)) as free_space_mb
    FROM sys.database_files");
    
    $space = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Vérifier les permissions
    $stmt = $conn->query("SELECT 
        IS_SRVROLEMEMBER('sysadmin') as is_sysadmin,
        IS_MEMBER('db_owner') as is_db_owner,
        IS_MEMBER('db_datareader') as is_datareader,
        IS_MEMBER('db_datawriter') as is_datawriter");
    
    $permissions = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Vérifier la version du serveur
    $stmt = $conn->query("SELECT 
        @@VERSION as server_version,
        SERVERPROPERTY('ProductVersion') as product_version,
        SERVERPROPERTY('Edition') as edition");
    
    $serverInfo = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'database' => [
            'name' => DB_NAME,
            'host' => DB_HOST,
            'port' => DB_PORT,
            'files' => $files,
            'space' => $space,
            'permissions' => $permissions,
            'server_info' => $serverInfo
        ]
    ], JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}
