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

// Fetch user's cart items from the database
$cartQuery = "SELECT cart.*, product.product_name, product.price FROM cart 
              JOIN product ON cart.product_id = product.product_id 
              WHERE cart.user_id = '$userId'";

$cartResult = $conn->query($cartQuery);

if ($cartResult->num_rows > 0) {
    $cartItems = [];
    while ($row = $cartResult->fetch_assoc()) {
        $cartItems[] = $row;
    }
    echo json_encode(["success" => true, "cart_items" => $cartItems]);
} else {
    echo json_encode(["success" => true, "message" => "No items in the cart"]);
}

// Close the database connection
$conn->close();
?>
