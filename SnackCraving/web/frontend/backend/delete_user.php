<?php
include 'db_conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $userId = mysqli_real_escape_string($conn, $_POST['userId']);

    $deleteQuery = "DELETE FROM users WHERE user_id = ?";
    $stmt = mysqli_prepare($conn, $deleteQuery);

    if($stmt){
        mysqli_stmt_bind_param($stmt, "i", $userId);

        // Execute the statement
        if(mysqli_stmt_execute($stmt)){
            echo "User deleted successfully";
        } else {
            echo "Error deleting user: " . mysqli_stmt_error($stmt);
        }

        // Close the statement
        mysqli_stmt_close($stmt);
    } else {
        echo "Error preparing delete statement: " . mysqli_error($conn);
    }

    mysqli_close($conn);
} else {
    echo "Invalid request method";
}
?>
