<?php
class Database {
    private $conn;
    
    public function __construct() {
        try {
            $this->conn = new PDO(
                "sqlsrv:Server=" . DB_HOST . "," . DB_PORT . ";Database=" . DB_NAME . ";TrustServerCertificate=true;Encrypt=true",
                DB_USER,
                DB_PASS,
                DB_OPTIONS
            );
        } catch(PDOException $e) {
            die("Erreur de connexion: " . $e->getMessage());
        }
    }
    
    public function getConnection() {
        return $this->conn;
    }

    // Fonction utilitaire pour exécuter les requêtes
    public function query($sql, $params = []) {
        try {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        } catch(PDOException $e) {
            die("Erreur lors de l'exécution de la requête: " . $e->getMessage());
        }
    }
}
