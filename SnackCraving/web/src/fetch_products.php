<?php
// Include the database connection file
include 'db_conn.php';

// Virtual table creation query
$viewsql = "CREATE VIEW food_menu AS SELECT product_name, product_category, price, stock_quantity, food_status FROM product 
JOIN category ON product.product_category_id = category.product_category_id  JOIN product_status ON product.status_id = product_status.status_id";

// Fetch data from the menu view
$sql = "SELECT * FROM food_menu";
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
