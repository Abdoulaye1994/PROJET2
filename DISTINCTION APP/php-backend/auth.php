<?php
require_once 'config.php';
require_once 'database.php';

function generateToken($user) {
    $jwt = new \Firebase\JWT\JWT;
    $token = array(
        "id" => $user['id'],
        "username" => $user['username'],
        "isAdmin" => $user['isAdmin']
    );
    return $jwt->encode($token, JWT_SECRET);
}

function verifyToken($token) {
    $jwt = new \Firebase\JWT\JWT;
    try {
        $decoded = $jwt->decode($token, JWT_SECRET, array('HS256'));
        return (array) $decoded;
    } catch (Exception $e) {
        return false;
    }
}

function getAuthHeader() {
    $headers = getallheaders();
    return isset($headers['Authorization']) ? $headers['Authorization'] : '';
}

function checkAuth() {
    $authHeader = getAuthHeader();
    if (!$authHeader) {
        http_response_code(401);
        echo json_encode(['error' => 'Token manquant']);
        exit;
    }

    $token = str_replace('Bearer ', '', $authHeader);
    $user = verifyToken($token);
    
    if (!$user) {
        http_response_code(403);
        echo json_encode(['error' => 'Token invalide']);
        exit;
    }

    return $user;
}
