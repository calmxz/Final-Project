<?php
// Include the database connection file
include 'db_conn.php';

// DataTables parameters
$columns = array(
    0 => 'product_id', // Add more columns as needed
    1 => 'product_name',
    2 => 'product_category',
    3 => 'price',
    4 => 'stock_quantity',
    5 => 'food_status',
);

// Fetch data from the food_menu table
$sql = "SELECT * FROM food_menu";

// Count total records without filtering
$result = $conn->query($sql);
$totalRecords = $result->num_rows;

// Execute the SQL query
$result = $conn->query($sql);

// Fetch and store data in an array
$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Close the database connection
$conn->close();
?>
