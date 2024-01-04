<?php
// Enable CORS and set headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Include database connection
include('db_connection.php');

// Fetch cart data from the request
$data = json_decode(file_get_contents("php://input"));

// Validate data
if (!isset($data->user_id) || !isset($data->product_id) || !isset($data->quantity)) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

$userId = $data->user_id;
$productId = $data->product_id;
$quantity = $data->quantity;

// Initialize transaction
mysqli_autocommit($conn, false);

// Get product details
$productQuery = "SELECT * FROM product WHERE product_id = '$productId'";
$productResult = $conn->query($productQuery);

if ($productResult->num_rows > 0) {
    $productRow = $productResult->fetch_assoc();
    $price = $productRow['price'];

    // Calculate amount
    $amount = $price * $quantity;

    // Your SQL query to insert cart item
    $query = "INSERT INTO cart (user_id, product_id, quantity, total_amount) VALUES ('$userId', '$productId', '$quantity', '$amount')";

    if ($conn->query($query) === TRUE) {
        // Commit the transaction
        mysqli_commit($conn);

        echo json_encode(["success" => true, "message" => "Item added to cart successfully", "amount" => $amount]);
    } else {
        // Rollback the transaction on failure
        mysqli_rollback($conn);

        echo json_encode(["success" => false, "message" => "Error adding item to cart: " . mysqli_error($conn)]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Product not found"]);
}

// Close the database connection
$conn->close();
?>
