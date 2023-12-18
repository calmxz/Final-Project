<?php
include 'db_conn.php';

if (isset($_GET['productId'])) {
    $productId = mysqli_real_escape_string($conn, $_GET['productId']);

    // Validate that $productId is not empty and is a numeric value
    if (!empty($productId) && is_numeric($productId)) {
        $query = "SELECT * FROM product WHERE product_id = $productId";
        $result = mysqli_query($conn, $query);

        if ($result) {
            $productDetails = mysqli_fetch_assoc($result);
            echo json_encode($productDetails);
        } else {
            echo "Error fetching product details: " . mysqli_error($conn);
        }
    } else {
        echo "Invalid product ID provided.";
    }

    mysqli_close($conn);
} else {
    echo "Product ID not provided.";
}
?>