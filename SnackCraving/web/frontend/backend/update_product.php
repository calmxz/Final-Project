<?php
include 'db_conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $productId = mysqli_real_escape_string($conn, $_POST['productId']);
    $productName = mysqli_real_escape_string($conn, $_POST['productName']);
    $productCategory = mysqli_real_escape_string($conn, $_POST['productCategory']);
    $productPrice = mysqli_real_escape_string($conn, $_POST['productPrice']);
    $stockQuantity = mysqli_real_escape_string($conn, $_POST['stockQuantity']);
    $productStatus = mysqli_real_escape_string($conn, $_POST['productStatus']);

    // Using prepared statements to prevent SQL injection
    $updateQuery = "UPDATE product SET
                    product_name = ?,
                    product_category_id = ?,
                    price = ?,
                    stock_quantity = ?,
                    status_id = ?
                    WHERE product_id = ?";

    $stmt = mysqli_prepare($conn, $updateQuery);

    // Bind parameters
    mysqli_stmt_bind_param($stmt, "siiiss", $productName, $productCategory, $productPrice, $stockQuantity, $productStatus, $productId);

    // Execute the update
    $updateResult = mysqli_stmt_execute($stmt);

    if ($updateResult) {
        echo "Product updated successfully";
    } else {
        echo "Error updating product: " . mysqli_error($conn);
    }

    // Close the statement
    mysqli_stmt_close($stmt);

    mysqli_close($conn);
} else {
    echo "Invalid request method";
}
?>
