<?php
// Include the file for database connection
include 'db_conn.php';

// Assuming you have received data from the AJAX request
$productId = mysqli_real_escape_string($conn, $_POST['productId']);

// Fetch the current status ID from the database
$query = "SELECT status_id FROM product WHERE product_id = $productId";
$result = mysqli_query($conn, $query);

if ($result) {
    $row = mysqli_fetch_assoc($result);
    $currentStatusId = $row['status_id'];

    // Toggle the status
    if ($currentStatusId == 1) {
        $newStatusId = 2; // Assuming 1 is Available, and 2 is Unavailable
    } elseif ($currentStatusId == 2) {
        $newStatusId = 1;
    } else {
        echo "Error: Unknown current status ID";
        exit;
    }

    // Update the database
    $updateQuery = "UPDATE product SET status_id = $newStatusId WHERE product_id = $productId";
    $updateResult = mysqli_query($conn, $updateQuery);

    if ($updateResult) {
        // Fetch the new food_status from product_status table
        $fetchStatusQuery = "SELECT food_status FROM product_status WHERE status_id = $newStatusId";
        $fetchStatusResult = mysqli_query($conn, $fetchStatusQuery);

        if ($fetchStatusResult) {
            $newStatus = mysqli_fetch_assoc($fetchStatusResult)['food_status'];
            echo $newStatus; // Send the new status back to the client
        } else {
            echo "Error fetching new status: " . mysqli_error($conn);
        }
    } else {
        echo "Error updating status: " . mysqli_error($conn);
        echo "Product ID: $productId, Current Status ID: $currentStatusId, New Status ID: $newStatusId";
    }
} else {
    echo "Error fetching current status ID: " . mysqli_error($conn);
}

mysqli_close($conn);
?>