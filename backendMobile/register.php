<?php
// Enable CORS and set headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Include database connection
include('db_connection.php');

// Fetch user data from the request
$data = json_decode(file_get_contents("php://input"));

// Validate data
if (
    !isset($data->first_name) ||
    !isset($data->middle_name) ||
    !isset($data->last_name) ||
    !isset($data->username) ||
    !isset($data->email) ||
    !isset($data->password) ||
    !isset($data->phone)
) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

$firstName = $data->first_name;
$middleName = $data->middle_name;
$lastName = $data->last_name;
$username = $data->username;
$email = $data->email;
$password = password_hash($data->password, PASSWORD_DEFAULT);
$phoneNumber = $data->phone;

// Your SQL query to insert user data
$query = "INSERT INTO users (first_name, middle_name, last_name, username, email, hashed_password, phone, role_id, balance) VALUES ('$firstName', '$middleName', '$lastName', '$username', '$email', '$password', '$phoneNumber', 2, 0.00)";

if ($conn->query($query) === TRUE) {
    echo json_encode(["success" => true, "message" => "Registration successful"]);
} else {
    echo json_encode(["success" => false, "message" => "Error registering user: " . mysqli_error($conn)]);  
}

// Close the database connection
$conn->close();
?>