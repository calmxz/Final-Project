<?php
// Include the database connection file
include 'db_conn.php';

// Fetch data from the menu view
$sql = "SELECT p.product_id, p.product_name, c.product_category, p.price, p.stock_quantity, ps.food_status
FROM product p
LEFT JOIN category c ON p.product_category_id = c.product_category_id
LEFT JOIN product_status ps ON p.status_id = ps.status_id";
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
