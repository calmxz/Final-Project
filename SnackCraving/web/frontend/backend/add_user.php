<?php
// Include the database connection file
include 'db_conn.php';

// Validate and sanitize input
$firstName = mysqli_real_escape_string($conn, $_POST['firstName']);
$middleName = mysqli_real_escape_string($conn, $_POST['middleName']);
$lastName = mysqli_real_escape_string($conn, $_POST['lastName']);
$username = mysqli_real_escape_string($conn, $_POST['username']);
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password
$email = mysqli_real_escape_string($conn, $_POST['email']);
$phone = mysqli_real_escape_string($conn, $_POST['phone']);
$roleId = 1; // Assuming role_id 1 is a default role (you can change this based on your roles)
$balance = 0.00;

// Check if the username, email, or phone already exists
$checkQuery = "SELECT user_id, username, email, phone FROM users WHERE username = ? OR email = ? OR phone = ?";
$checkStmt = $conn->prepare($checkQuery);
$checkStmt->bind_param('sss', $username, $email, $phone);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows > 0) {
    // Duplicate entry found, send JSON response with duplicated fields
    $duplicatedFields = array();
    while ($row = $checkResult->fetch_assoc()) {
        if ($row['username'] == $username) {
            $duplicatedFields[] = 'Username';
        }
        if ($row['email'] == $email) {
            $duplicatedFields[] = 'Email';
        }
        if ($row['phone'] == $phone) {
            $duplicatedFields[] = 'Phone Number';
        }
    }

    echo json_encode(array(
        'message' => 'Duplicate entry found.',
        'duplicatedFields' => $duplicatedFields
    ));
} else {
    // Insert the user into the database
    $insertQuery = "INSERT INTO users (first_name, middle_name, last_name, username, hashed_password, email, phone, role_id, balance) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $insertStmt = $conn->prepare($insertQuery);
    $insertStmt->bind_param('sssssssii', $firstName, $middleName, $lastName, $username, $password, $email, $phone, $roleId, $balance);

    if ($insertStmt->execute()) {
        echo json_encode(array(
            'message' => 'User added successfully.'
        ));
    } else {
        echo json_encode(array(
            'message' => 'Error adding user: ' . $insertStmt->error
        ));
    }

    $insertStmt->close();
}

$checkStmt->close();
$conn->close();
?>
