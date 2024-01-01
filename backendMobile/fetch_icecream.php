<?php
// Enable CORS and set headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Include database connection
include('db_connection.php');

$query = "SELECT * FROM product LEFT JOIN category ON product.product_category_id = category.product_category_id WHERE category.product_category = 'ice cream'";

// Fetch data from the database
$result = $conn->query($query);

$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);

// Close the database connection
$conn->close();
?>
