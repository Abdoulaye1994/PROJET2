<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . FRONTEND_URL);
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once 'config.php';
require_once 'database.php';
require_once 'auth.php';

// Créer une instance de la base de données
db = new Database();
$conn = $db->getConnection();

// Récupérer les données POST
$data = json_decode(file_get_contents("php://input"), true);

// Gestion des routes API
$endpoint = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// Route de test
if ($endpoint == '/api/hello') {
    echo json_encode(['message' => 'Bienvenue sur DISTINCTION APP !']);
    exit;
}

// Authentification
if ($endpoint == '/api/login') {
    if ($method !== 'POST' || !isset($data['username']) || !isset($data['password'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Données manquantes']);
        exit;
    }

    $stmt = $db->query("SELECT * FROM Users WHERE username = ?", [$data['username']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        http_response_code(401);
        echo json_encode(['error' => 'Identifiants invalides']);
        exit;
    }

    // Vérification du mot de passe (à implémenter avec bcrypt)
    if ($user['password'] !== $data['password']) {
        http_response_code(401);
        echo json_encode(['error' => 'Identifiants invalides']);
        exit;
    }

    $token = generateToken($user);
    echo json_encode([
        'token' => $token,
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'isAdmin' => $user['isAdmin']
        ]
    ]);
    exit;
}

// Autres routes protégées
if (strpos($endpoint, '/api/') === 0) {
    $user = checkAuth();
    if (!$user) {
        exit;
    }

    // Routes protégées ici
    switch ($endpoint) {
        case '/api/users':
            if (!$user['isAdmin']) {
                http_response_code(403);
                echo json_encode(['error' => 'Accès refusé']);
                exit;
            }
            $stmt = $db->query("SELECT id, username, isAdmin, createdAt FROM Users");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            break;

        // Autres routes à implémenter...
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Route non trouvée']);
    }
    exit;
}

// Route non trouvée
http_response_code(404);
echo json_encode(['error' => 'Route non trouvée']);
