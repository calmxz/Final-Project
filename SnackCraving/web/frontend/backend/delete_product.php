<?php
include 'db_conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $productId = mysqli_real_escape_string($conn, $_POST['productId']);

    // Use a prepared statement to delete the product
    $deleteQuery = "DELETE FROM product WHERE product_id = ?";
    $stmt = mysqli_prepare($conn, $deleteQuery);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "i", $productId); // "i" represents an integer
        $deleteResult = mysqli_stmt_execute($stmt);

        if ($deleteResult) {
            echo "Product deleted successfully";
        } else {
            echo "Error deleting product: " . mysqli_error($conn);
        }

        mysqli_stmt_close($stmt);
    } else {
        echo "Error preparing delete statement: " . mysqli_error($conn);
    }

    mysqli_close($conn);
} else {
    echo "Invalid request method";
}
?>
