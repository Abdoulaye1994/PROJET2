<?php
require_once 'config.php';

try {
    // Configuration spécifique pour la vérification des permissions
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
    
    // Vérifier les permissions
    $sql = "
        SELECT 
            IS_SRVROLEMEMBER('sysadmin') as is_sysadmin,
            IS_MEMBER('db_owner') as is_db_owner,
            IS_MEMBER('db_datareader') as is_datareader,
            IS_MEMBER('db_datawriter') as is_datawriter,
            IS_MEMBER('db_ddladmin') as is_ddladmin
    ";

    $stmt = $conn->query($sql);
    $permissions = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Vérifier les rôles de l'utilisateur
    $sql = "
        SELECT 
            dp.name as role_name,
            dp.type_desc as role_type
        FROM sys.database_role_members drm
        JOIN sys.database_principals dp ON dp.principal_id = drm.role_principal_id
        WHERE drm.member_principal_id = USER_ID()
    ";

    $stmt = $conn->query($sql);
    $roles = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'permissions' => $permissions,
        'roles' => $roles
    ], JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}
