<?php
// Include the database connection file
include('db_connection.php');

// Your SQL query here (example)
$userQuery = "SELECT * FROM users";

// Execute the query
$userResult = $conn->query($userQuery);

// Check if the query was successful
if ($userResult) {
    // Fetch data and output it (example)
    $users = array();

    while ($row = $userResult->fetch_assoc()) {
        $user = array(
            'user_id' => $row['user_id'],
            'first_name' => $row['first_name'],
            'middle_name' => $row['middle_name'],
            'last_name' => $row['last_name'],
            'username' => $row['username'],
            'email' => $row['email'],
            'phone' => $row['phone'],
            'role_id' => $row['role_id'],
            'created_at' => $row['created_at']
        );

        $users[] = $user;
    }

    // Output JSON response
    header('Content-Type: application/json');
    echo json_encode($users);
} else {
    // Output error message
    echo "Error: " . $userQuery . "<br>" . $conn->error;
}

// Close the database connection
$conn->close();
?>
