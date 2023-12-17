<?php
// Include your database connection file
include 'db_conn.php';

if (isset($_GET['userId'])) {
    $userId = mysqli_real_escape_string($conn, $_GET['userId']);

    // Validate that $userId is not empty and is a numeric value
    if (!empty($userId) && is_numeric($userId)) {
        $query = "SELECT * FROM users WHERE user_id = $userId";
        $result = mysqli_query($conn, $query);

        if ($result) {
            $userDetails = mysqli_fetch_assoc($result);
            echo json_encode($userDetails);
        } else {
            echo "Error fetching user details: " . mysqli_error($conn);
        }
    } else {
        echo "Invalid user ID provided.";
    }

    mysqli_close($conn);
} else {
    echo "User ID not provided.";
}

?>