<?php
require_once 'config.php';
require_once 'database.php';
require_once 'auth.php';

// Créer une instance de la base de données
$db = new Database();
$conn = $db->getConnection();

// Fonction pour tester une transaction simple
function testSimpleTransaction($conn) {
    try {
        // Démarrer la transaction
        $conn->beginTransaction();
        
        // Insérer un utilisateur test
        $stmt = $conn->prepare("INSERT INTO Users (username, password) VALUES (?, ?)");
        $username = 'test_user_' . time();
        $password = password_hash('test_password', PASSWORD_DEFAULT);
        $stmt->execute([$username, $password]);
        
        // Insérer une transaction test
        $stmt = $conn->prepare("INSERT INTO Transactions (user_id, amount, description) VALUES (?, ?, ?)");
        $user_id = $conn->lastInsertId();
        $amount = 100.50;
        $description = 'Test transaction';
        $stmt->execute([$user_id, $amount, $description]);
        
        // Valider la transaction
        $conn->commit();
        
        return [
            'success' => true,
            'message' => 'Transaction simple réussie'
        ];
    } catch (Exception $e) {
        // Annuler la transaction en cas d'erreur
        $conn->rollBack();
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

// Fonction pour tester une transaction complexe
function testComplexTransaction($conn) {
    try {
        // Démarrer la transaction
        $conn->beginTransaction();
        
        // Insérer un utilisateur test
        $stmt = $conn->prepare("INSERT INTO Users (username, password) VALUES (?, ?)");
        $username = 'complex_user_' . time();
        $password = password_hash('complex_password', PASSWORD_DEFAULT);
        $stmt->execute([$username, $password]);
        $user_id = $conn->lastInsertId();
        
        // Insérer plusieurs transactions
        $transactions = [
            ['amount' => 100.50, 'description' => 'Transaction 1'],
            ['amount' => 200.75, 'description' => 'Transaction 2'],
            ['amount' => 50.25, 'description' => 'Transaction 3']
        ];
        
        $stmt = $conn->prepare("INSERT INTO Transactions (user_id, amount, description) VALUES (?, ?, ?)");
        foreach ($transactions as $transaction) {
            $stmt->execute([$user_id, $transaction['amount'], $transaction['description']]);
        }
        
        // Mettre à jour le solde de l'utilisateur
        $stmt = $conn->prepare("UPDATE Users SET balance = ? WHERE id = ?");
        $total = array_sum(array_column($transactions, 'amount'));
        $stmt->execute([$total, $user_id]);
        
        // Valider la transaction
        $conn->commit();
        
        return [
            'success' => true,
            'message' => 'Transaction complexe réussie'
        ];
    } catch (Exception $e) {
        // Annuler la transaction en cas d'erreur
        $conn->rollBack();
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

// Tester les transactions
$simple_result = testSimpleTransaction($conn);
$complex_result = testComplexTransaction($conn);

// Résultat final
$result = [
    'simple_transaction' => $simple_result,
    'complex_transaction' => $complex_result
];

// Afficher le résultat en JSON
echo json_encode($result, JSON_PRETTY_PRINT);
