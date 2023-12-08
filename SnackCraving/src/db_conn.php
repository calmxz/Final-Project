/**
* PHP code for database connection
 */

<?php
$servername = "localhost";
$database = "sc_db";
$username = "root";
$password = "1234";

try {
    $conn = new mysqli($servername, $username, $password, $database);
    if ($db->connect_error) {
        die("Connection failed: " . $db->connect_error);
    }
    
} catch (Exception $e) {
    echo $e->getMessage();
}
?>