<?php
// Include the file for database connection
include 'db_conn.php';

// Assuming you have received data from the AJAX request
$productName = mysqli_real_escape_string($conn, $_POST['productName']);
$productCategory = mysqli_real_escape_string($conn, $_POST['productCategory']);
$productPrice = mysqli_real_escape_string($conn, $_POST['productPrice']);
$stockQuantity = mysqli_real_escape_string($conn, $_POST['stockQuantity']);

// Capitalize the first letter of each word in the product name
$productName = ucwords($productName);

// Check if the product name already exists
$checkQuery = "SELECT COUNT(*) as count FROM product WHERE product_name = '$productName'";
$checkResult = mysqli_query($conn, $checkQuery);

if ($checkResult) {
    $row = mysqli_fetch_assoc($checkResult);
    $productCount = $row['count'];

    if ($productCount > 0) {
        // Product name already exists
        echo 'existing';
    } else {
        // Insert the new product into the database
        $insertQuery = "INSERT INTO product (product_name, product_category_id, price, stock_quantity, status_id)
                        VALUES ('$productName', '$productCategory', $productPrice, $stockQuantity, 1)";
        $insertResult = mysqli_query($conn, $insertQuery);

        if ($insertResult) {
            echo "Product added successfully";
        } else {
            echo "Error adding product: " . mysqli_error($conn);
        }
    }
} else {
    echo "Error checking for existing product: " . mysqli_error($conn);
}

mysqli_close($conn);
?>