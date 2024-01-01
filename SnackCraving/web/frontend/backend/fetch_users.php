<?php
// Include the database connection file
include 'db_conn.php';

// DataTables parameters
$columns = array(
    0 => 'user_id', // Add more columns as needed
    1 => 'full_name',
    2 => 'username',
    3 => 'email',
    4 => 'phone',
    5 => 'role_name',
    6 => 'created_at',
    7 => 'balance',
);

$userQuery = "SELECT * FROM app_users";

$result = $conn->query($userQuery);
$totalRecords = $result->num_rows;

// Execute the SQL query
$result = $conn->query($userQuery);

// Fetch and store data in an array
$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Close the database connection
$conn->close();
?>