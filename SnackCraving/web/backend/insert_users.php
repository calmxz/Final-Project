<?php
// Include your database connection logic
include 'db_conn.php';

// Sample user data
$users = [
    ['Jean', NULL, 'Valjean', 'Prisoner 24601', '1234', 'jean.valjean@lorma.edu', '0987654321', '1'],
    ['Mark', 'Reyes', 'Perez', 'calm', 'Serenity', 'mark.perez@lorma.edu', '1234567890', '2'],
    ['Christopher', 'Garcia', 'Flores', 'Chris2518', 'imissher', 'christopher.flores@lorma.edu', '095321678', '2'],
    ['Maki', NULL, 'Zenin', 'Monster', 'HeavenlyRestriction', 'maki.zenin@lorma.edu', '0956784321', '1'],
    ['Nayeon', NULL, 'Im', 'Bunny', 'Pop', 'im.nayeon@lorma.edu', '096781234', '2']
];

foreach ($users as $userData) {
    // Extract user data
    list($firstName, $middleName, $lastName, $username, $password, $email, $phone, $roleId) = $userData;

    // Hash the password before storing it in the database
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT, ['cost' => 10]);

    // Perform the database insert
    $sql = "INSERT INTO users (first_name, middle_name, last_name, username, hashed_password, email, phone, role_id) 
            VALUES ('$firstName', '$middleName', '$lastName', '$username', '$hashedPassword', '$email', '$phone', '$roleId')";

    if ($conn->query($sql) === TRUE) {
        echo "User '$username' inserted successfully<br>";
    } else {
        echo "Error inserting user '$username': " . $conn->error . "<br>";
    }
}

// Close the database connection
$conn->close();
?>