<?php
// Enable CORS and set headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Include database connection
include('db_connection.php');

// Fetch user ID from the request
$data = json_decode(file_get_contents("php://input"));

// Validate data
if (!isset($data->user_id)) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

$userId = $data->user_id;

$query = "SELECT SUM(total_amount) AS totalAmount FROM cart WHERE user_id = $userId";

// Fetch data from the database
$result = $conn->query($query);

if (!$result) {
    // Handle the query error
    echo json_encode(["success" => false, "message" => "Query error: " . $conn->error]);
    exit;
}

$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode(["success" => true, "totalAmount" => $data[0]['totalAmount']]);

// Close the database connection
$conn->close();
?>