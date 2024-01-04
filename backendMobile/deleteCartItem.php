<?php
// Enable CORS and set headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Include database connection
include('db_connection.php');

// Fetch cart ID from the request
$data = json_decode(file_get_contents("php://input"));

// Validate data
if (!isset($data->cart_id)) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

$cartId = $data->cart_id;

// Your SQL query to delete cart item
$query = "DELETE FROM cart WHERE cart_id = '$cartId'";

if ($conn->query($query) === TRUE) {
    echo json_encode(["success" => true, "message" => "Item deleted from cart successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error deleting item from cart: " . mysqli_error($conn)]);
}

// Close the database connection
$conn->close();
?>
