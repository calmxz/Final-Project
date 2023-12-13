<?php
// Include the file for database connection
include 'db_conn.php';

// Assuming you have received data from the AJAX request
$productName = mysqli_real_escape_string($conn, $_POST['productName']);
$productCategory = mysqli_real_escape_string($conn, $_POST['productCategory']);
$productPrice = mysqli_real_escape_string($conn, $_POST['productPrice']);
$stockQuantity = mysqli_real_escape_string($conn, $_POST['stockQuantity']);

// Insert the new product into the database
$insertQuery = "INSERT INTO product (product_name, product_category_id, price, stock_quantity, status_id)
                VALUES ('$productName', '$productCategory', $productPrice, $stockQuantity, 1)";
$insertResult = mysqli_query($conn, $insertQuery);

if ($insertResult) {
    echo "Product added successfully";
} else {
    echo "Error adding product: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
