<?php
$servername = "localhost";
$database = "sc_db";
$username = "root";
$password = "1234";

/**
 * TODO: DATABASE CONNECTION
 * *use infoman midterm as basis
 * ! DONT FORGET GRRR
 */
try {
    $conn = new mysqli($servername, $username, $password, $database);
    if ($db->connect_error) {
        die("Connection failed: " . $db->connect_error);
    }
    
} catch (Exception $e) {
    echo $e->getMessage();
}
?>