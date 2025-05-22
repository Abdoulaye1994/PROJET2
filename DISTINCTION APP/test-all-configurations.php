<?php
// Configuration de base
$host = 'sql1003';
$db_name = 'db_ab928a_yekpondafe';
$db_user = 'db_ab928a_yekpondafe_admin';
$db_pass = '3NAtiposy@22.';
$db_port = 1433;

// Options PDO pour SQL Server
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
    PDO::SQLSRV_ATTR_DIRECT_QUERY => true,
    PDO::SQLSRV_ATTR_QUERY_TIMEOUT => 30,
    PDO::SQLSRV_ATTR_CONNECTION_TIMEOUT => 30,
    PDO::SQLSRV_ATTR_ENCRYPT => true,
    PDO::SQLSRV_ATTR_TRUST_SERVER_CERTIFICATE => true
];

// Fonction pour tester la connexion
function testConnection($host, $db_name, $db_user, $db_pass, $db_port, $options) {
    try {
        $dsn = "sqlsrv:Server=$host,$db_port;Database=$db_name";
        $conn = new PDO($dsn, $db_user, $db_pass, $options);
        
        // Tester une requête simple
        $stmt = $conn->query("SELECT 1");
        $result = $stmt->fetch();
        
        return [
            'success' => true,
            'message' => 'Connexion réussie et requête testée avec succès'
        ];
    } catch (PDOException $e) {
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

// Fonction pour tester les permissions
function testPermissions($conn) {
    try {
        // Tester les permissions de base
        $permissions = [
            'select' => false,
            'insert' => false,
            'update' => false,
            'delete' => false
        ];

        // Tester SELECT
        $stmt = $conn->query("SELECT TOP 1 * FROM Users");
        if ($stmt->fetch()) {
            $permissions['select'] = true;
        }

        // Tester INSERT
        $stmt = $conn->prepare("INSERT INTO Users (username, password) VALUES (?, ?)");
        if ($stmt->execute(['test_user_' . time(), 'test_password'])) {
            $permissions['insert'] = true;
            
            // Tester DELETE
            $stmt = $conn->prepare("DELETE FROM Users WHERE username = ?");
            if ($stmt->execute(['test_user_' . time()])) {
                $permissions['delete'] = true;
            }
        }

        // Tester UPDATE
        if ($permissions['insert']) {
            $stmt = $conn->prepare("UPDATE Users SET password = ? WHERE username = ?");
            if ($stmt->execute(['new_password', 'test_user_' . time()])) {
                $permissions['update'] = true;
            }
        }

        return [
            'success' => true,
            'permissions' => $permissions
        ];
    } catch (PDOException $e) {
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

// Tester la connexion
$connection_result = testConnection($host, $db_name, $db_user, $db_pass, $db_port, $options);

// Si la connexion réussit, tester les permissions
$permissions_result = null;
if ($connection_result['success']) {
    $dsn = "sqlsrv:Server=$host,$db_port;Database=$db_name";
    $conn = new PDO($dsn, $db_user, $db_pass, $options);
    $permissions_result = testPermissions($conn);
}

// Résultat final
$result = [
    'connection' => $connection_result,
    'permissions' => $permissions_result
];

// Afficher le résultat en JSON
echo json_encode($result, JSON_PRETTY_PRINT);
