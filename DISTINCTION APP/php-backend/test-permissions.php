<?php
require_once 'config.php';
require_once 'database.php';

try {
    // Créer une instance de la base de données
    $db = new Database();
    $conn = $db->getConnection();
    
    // Tester les différentes permissions
    $tests = [
        'SELECT' => "SELECT 1",
        'CREATE TABLE' => "
            IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TestTable]') AND type in (N'U'))
            DROP TABLE TestTable;
            CREATE TABLE TestTable (id INT)
        ",
        'INSERT' => "INSERT INTO TestTable (id) VALUES (1)",
        'UPDATE' => "UPDATE TestTable SET id = 2 WHERE id = 1",
        'DELETE' => "DELETE FROM TestTable WHERE id = 2",
        'DROP TABLE' => "DROP TABLE TestTable"
    ];

    $results = [];
    foreach ($tests as $permission => $query) {
        try {
            $conn->exec($query);
            $results[$permission] = [
                'success' => true,
                'message' => 'Permission accordée'
            ];
        } catch (PDOException $e) {
            $results[$permission] = [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    echo json_encode([
        'database' => [
            'connected' => true,
            'permissions' => $results
        ]
    ], JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    echo json_encode([
        'database' => [
            'connected' => false,
            'error' => $e->getMessage()
        ]
    ], JSON_PRETTY_PRINT);
}
