<?php
// Include the database connection file
include 'db_conn.php';

// Fetch data from the database
$sql = "SELECT * FROM category ORDER BY product_category_id";
$result = $conn->query($sql); 

// Check if there are rows in the result
if ($result->num_rows > 0) {
    // Fetch and store data in an array
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    $data = array();
}

// Close the database connection
$conn->close();
?>
