<?php
require_once 'config.php';
require_once 'database.php';

// Créer une instance de la base de données
$db = new Database();
$conn = $db->getConnection();

// Fonction pour mesurer le temps d'exécution
function timer() {
    static $start = null;
    if ($start === null) {
        $start = microtime(true);
        return 0;
    }
    $end = microtime(true);
    $time = $end - $start;
    $start = $end;
    return $time;
}

// Tests de charge
$tests = [
    'simple_query' => function($conn) {
        timer();
        $stmt = $conn->query("SELECT 1");
        $stmt->fetch();
        return timer();
    },
    'select_users' => function($conn) {
        timer();
        $stmt = $conn->query("SELECT * FROM Users");
        $stmt->fetchAll();
        return timer();
    },
    'select_transactions' => function($conn) {
        timer();
        $stmt = $conn->query("SELECT * FROM Transactions");
        $stmt->fetchAll();
        return timer();
    },
    'complex_query' => function($conn) {
        timer();
        $stmt = $conn->query("
            SELECT u.username, t.amount, t.description
            FROM Users u
            JOIN Transactions t ON u.id = t.user_id
            ORDER BY t.created_at DESC
            LIMIT 100
        ");
        $stmt->fetchAll();
        return timer();
    }
];

// Exécuter chaque test 100 fois
$results = [];
foreach ($tests as $name => $test) {
    $times = [];
    for ($i = 0; $i < 100; $i++) {
        $times[] = $test($conn);
    }
    $results[$name] = [
        'average' => array_sum($times) / count($times),
        'min' => min($times),
        'max' => max($times),
        'times' => $times
    ];
}

// Résultat final
$result = [
    'performance' => $results,
    'timestamp' => date('Y-m-d H:i:s')
];

// Afficher le résultat en JSON
echo json_encode($result, JSON_PRETTY_PRINT);
