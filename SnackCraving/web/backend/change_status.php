<?php
// Include the file for database connection
include 'db_conn.php';

// Check if the productId and newStatus are set in the POST request
if (isset($_POST['productId'], $_POST['newStatus'])) {
    // Sanitize the input to prevent SQL injection
    $productId = mysqli_real_escape_string($conn, $_POST['productId']);
    $newStatus = mysqli_real_escape_string($conn, $_POST['newStatus']);

    // Use prepared statement to prevent SQL injection
    $query = "UPDATE food_menu SET food_status = ? WHERE product_id = ?";
    
    $stmt = mysqli_prepare($conn, $query);

    if ($stmt) {
        // Bind the parameters
        mysqli_stmt_bind_param($stmt, "si", $newStatus, $productId);

        // Execute the statement
        $result = mysqli_stmt_execute($stmt);

        if ($result) {
            echo json_encode(['status' => 'success', 'message' => 'Status updated successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error updating status']);
        }

        // Close the statement
        mysqli_stmt_close($stmt);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error preparing statement']);
    }

    // Close the database connection
    mysqli_close($conn);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
}
?>
