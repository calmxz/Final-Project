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

// Use a prepared statement to prevent SQL injection
$query = "SELECT balance FROM users WHERE user_id = ?";
$stmt = $conn->prepare($query);

// Bind the parameter
$stmt->bind_param("i", $userId);

// Execute the statement
$stmt->execute();

// Get the result
$result = $stmt->get_result();

if (!$result) {
    // Handle the query error
    echo json_encode(["success" => false, "message" => "Query error: " . $conn->error]);
    exit;
}

$data = $result->fetch_assoc();

if (!$data) {
    // Handle the case where no balance is found for the user
    echo json_encode(["success" => false, "message" => "No balance found for the user"]);
    exit;
}

// Return the user's balance
echo json_encode(["success" => true, "balance" => $data['balance']]);

// Close the prepared statement
$stmt->close();

// Close the database connection
$conn->close();
?>
