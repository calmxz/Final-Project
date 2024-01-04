<?php
// Enable CORS and set headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Include database connection
include('db_connection.php');

// Fetch data from the request
$data = json_decode(file_get_contents("php://input"));

// Validate data
if (!isset($data->user_id) || !isset($data->amount_paid) || !isset($data->total_amount)) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

$userId = $data->user_id;
$amountPaid = $data->amount_paid;

// Fetch user's cart items from the database
$query = "SELECT cart_id, product_id, quantity, total_amount FROM cart WHERE user_id = $userId";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    // Start a database transaction
    $conn->begin_transaction();

    try {
        while ($row = $result->fetch_assoc()) {
            $cartId = $row['cart_id'];
            $productId = $row['product_id'];
            $quantity = $row['quantity'];
            $totalAmount = $data->total_amount;

            // Fetch user ID and balance from the database
            $userQuery = "SELECT user_id, balance FROM users WHERE user_id = $userId";
            $userResult = $conn->query($userQuery);

            if ($userResult->num_rows > 0) {
                $userRow = $userResult->fetch_assoc();
                $balance = $userRow['balance'];

                // Check if the balance is sufficient
                if ($balance < $totalAmount) {
                    echo json_encode(["success" => false, "message" => "Insufficient balance for cart ID $cartId"]);
                    exit;
                }

                // Calculate change amount
                $changeAmount = $amountPaid - $totalAmount;

                // Insert into orders table
                $insertOrderQuery = "INSERT INTO orders (user_id, product_id, quantity, total_amount, amount_paid, change_amount)
                                     VALUES ($userId, $productId, $quantity, $totalAmount, $amountPaid, $changeAmount)";
                $conn->query($insertOrderQuery);

                // Update user balance
                $updateBalanceQuery = "UPDATE users SET balance = balance - $totalAmount WHERE user_id = $userId";
                $conn->query($updateBalanceQuery);

                // Update product stock quantity
                $updateQuantity = "UPDATE product SET stock_quantity = stock_quantity - $quantity WHERE product_id = $productId";
                $conn->query($updateQuantity);
            } else {
                echo json_encode(["success" => false, "message" => "User not found"]);
                exit;
            }

            // Delete row from the cart table
            $deleteCartQuery = "DELETE FROM cart WHERE cart_id = $cartId";
            $conn->query($deleteCartQuery);
        }

        // Commit the transaction
        $conn->commit();

        echo json_encode(["success" => true, "message" => "Orders confirmed successfully"]);
    } catch (Exception $e) {
        // Rollback the transaction in case of an error
        $conn->rollback();
        echo json_encode(["success" => false, "message" => "Error confirming orders"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "No cart items found for user"]);
}

// Close the database connection
$conn->close();
?>
