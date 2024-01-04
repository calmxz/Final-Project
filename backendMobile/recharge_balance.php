<?php
// Include database connection
include('db_connection.php');

// Fetch data from the request
$data = json_decode(file_get_contents("php://input"));

// Validate data
if (!isset($data->user_id) || !isset($data->recharge_amount)) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

$userId = $data->user_id;
$rechargeAmount = $data->recharge_amount;

// Start a database transaction
$conn->begin_transaction();

try {
    // Fetch user balance from the database
    $userQuery = "SELECT balance FROM users WHERE user_id = $userId";
    $userResult = $conn->query($userQuery);

    if ($userResult->num_rows > 0) {
        $userRow = $userResult->fetch_assoc();
        $currentBalance = $userRow['balance'];

        // Update user balance
        $newBalance = $currentBalance + $rechargeAmount;
        $updateBalanceQuery = "UPDATE users SET balance = $newBalance WHERE user_id = $userId";
        $conn->query($updateBalanceQuery);

        // Commit the transaction
        $conn->commit();

        echo json_encode(["success" => true, "message" => "Recharge successful"]);
    } else {
        echo json_encode(["success" => false, "message" => "User not found"]);
    }
} catch (Exception $e) {
    // Rollback the transaction in case of an error
    $conn->rollback();
    echo json_encode(["success" => false, "message" => "Error during recharge"]);
}

// Close the database connection
$conn->close();
?>
