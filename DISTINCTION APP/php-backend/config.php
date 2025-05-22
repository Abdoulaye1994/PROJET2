<?php
define('DB_HOST', 'sql1003');
define('DB_NAME', 'db_ab928a_yekpondafe');
define('DB_USER', 'db_ab928a_yekpondafe_admin');
define('DB_PASS', '3NAtiposy@22.');
define('DB_PORT', '1433');
define('JWT_SECRET', 'distinction_secret_key_2025');
define('DB_CHARSET', 'UTF-8');

// Configuration pour le frontend
define('FRONTEND_URL', 'http://yekpondafe-001-site1.ptempurl.com/');

// Options de connexion optimisées pour SQL Server 2022
define('DB_OPTIONS', array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::SQLSRV_ATTR_QUERY_TIMEOUT => 30,
    PDO::ATTR_TIMEOUT => 30,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::SQLSRV_ATTR_DIRECT_QUERY => true,
    PDO::SQLSRV_ATTR_ENCODING => PDO::SQLSRV_ENCODING_SYSTEM
));
