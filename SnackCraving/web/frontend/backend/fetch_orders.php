<?php
// Include the database connection file
include 'db_conn.php';

// DataTables parameters
$columns = array(
    0 => 'order_id', // Add more columns as needed
    1 => 'user_name',
    2 => 'product_name',
    3 => 'quantity',
    4 => 'total_amount',
    5 => 'amount_paid',
    6 => 'change_amount',
    7 => 'date_ordered',
);

$orderQuery = "SELECT * FROM order_view";

$result = $conn->query($orderQuery);
$totalRecords = $result->num_rows;

// Execute the SQL query
$result = $conn->query($orderQuery);

// Fetch and store data in an array
$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Close the database connection
$conn->close();
?>