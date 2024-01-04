<?php
// Enable CORS and set headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Include database connection
include('db_connection.php');

// Fetch user credentials from the request
$data = json_decode(file_get_contents("php://input"));

// Validate email and password
if (!isset($data->email) || !isset($data->password)) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

$email = $data->email;
$password = $data->password;

// Your SQL query to check user credentials
$query = "SELECT * FROM users WHERE email = '$email'";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $hashedPassword = $row['hashed_password'];

    // Check if the provided password matches the stored hashed password
    if (password_verify($password, $hashedPassword)) {
        // Include all user data in the response
        $userData = [
            "user_id" => $row['user_id'],
            "first_name" => $row['first_name'],
            "username" => $row['username'],
            "email" => $row['email'],
            "phone" => $row['phone'],
            "balance" => $row['balance'],
        ];

        echo json_encode(["success" => true, "message" => "Login successful", "userData" => $userData]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid password"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "User not found"]);
}

// Close the database connection
$conn->close();
?>
