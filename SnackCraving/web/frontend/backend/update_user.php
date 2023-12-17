<?php
// Include your database connection file
include 'db_conn.php';

// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Extract user ID from the POST data
    $userId = isset($_POST['userId']) ? $_POST['userId'] : null;

    if ($userId === null) {
        echo "User ID is missing";
        exit;
    }

    // Validate and sanitize other updated user information
    $updatedFirstName = mysqli_real_escape_string($conn, $_POST['firstName'] ?? '');
    $updatedMiddleName = mysqli_real_escape_string($conn, $_POST['middleName'] ?? '');
    $updatedLastName = mysqli_real_escape_string($conn, $_POST['lastName'] ?? '');
    $updatedUsername = mysqli_real_escape_string($conn, $_POST['username'] ?? '');
    $updatedEmail = mysqli_real_escape_string($conn, $_POST['email'] ?? '');
    $updatedPhone = mysqli_real_escape_string($conn, $_POST['phone'] ?? '');

    // Extract old and new passwords
    $oldPassword = $_POST['oldPassword'] ?? '';
    $newPassword = $_POST['newPassword'] ?? '';

    // Get the current hashed password from the database
    $getPasswordQuery = "SELECT hashed_password FROM users WHERE user_id = '$userId'";
    $result = mysqli_query($conn, $getPasswordQuery);

    if ($result) {
        $row = mysqli_fetch_assoc($result);

        if ($row) {
            // Check if the old password is available and correct
            if (!empty($row['hashed_password']) && password_verify($oldPassword, $row['hashed_password'])) {
                // Old password is correct, proceed with the update

                // Update the password if a new password is provided
                if (!empty($newPassword)) {
                    $updatedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
                    $updatePasswordQuery = "UPDATE users SET hashed_password = '$updatedPassword' WHERE user_id = '$userId'";
                    mysqli_query($conn, $updatePasswordQuery);
                }

                // Update the user information in the database
                $updateQuery = "UPDATE users SET
                                first_name = '$updatedFirstName',
                                middle_name = '$updatedMiddleName',
                                last_name = '$updatedLastName',
                                username = '$updatedUsername',
                                email = '$updatedEmail',
                                phone = '$updatedPhone'
                                WHERE user_id = '$userId'";

                if (mysqli_query($conn, $updateQuery)) {
                    echo "User information updated successfully";
                } else {
                    echo "Error updating user information: " . mysqli_error($conn);
                }
            } else {
                echo "Incorrect old password";
            }
        } else {
            echo "User not found";
        }
    } else {
        echo "Error executing query: " . mysqli_error($conn);
    }

    // Close the database connection
    mysqli_close($conn);
} else {
    // Handle the case where the request method is not POST
    echo "Invalid request method";
}
?>