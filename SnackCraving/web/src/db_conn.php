<?php
$servername = "localhost";
$database = "sc_db";
$username = "root";
$password = "1234";

try {
    $conn = new mysqli($servername, $username, $password, $database);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
} catch (Exception $e) {
    echo $e->getMessage();
}
?>