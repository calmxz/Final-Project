<?php
// Enable CORS and set headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Include database connection
include('db_connection.php');

// Fetch cart ID, new quantity, and product price from the request
$data = json_decode(file_get_contents("php://input"));

// Validate data
if (!isset($data->cart_id) || !isset($data->quantity) || !isset($data->price)) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

$cartId = $data->cart_id;
$newQuantity = $data->quantity;
$productPrice = $data->price;

// Calculate new total amount based on the updated quantity
$newTotalAmount = $newQuantity * $productPrice;

// Your SQL query to update quantity and total amount in cart using cart_id
$query = "UPDATE cart SET quantity = '$newQuantity', total_amount = '$newTotalAmount' WHERE cart_id = '$cartId'";

if ($conn->query($query) === TRUE) {
    echo json_encode(["success" => true, "message" => "Quantity and total amount updated successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error updating quantity and total amount: " . mysqli_error($conn)]);
}

// Close the database connection
$conn->close();
?>