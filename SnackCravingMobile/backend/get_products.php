<?php
// Include the database connection file
include('db_connection.php');

// Your SQL query here (example)
$productQuery = "SELECT * FROM product";

// Execute the query
$productResult = $conn->query($productQuery);

// Check if the query was successful
if ($productResult) {
    // Fetch data and output it (example)
    $products = array();

    while ($row = $productResult->fetch_assoc()) {
        $product = array(
            'product_id' => $row['product_id'],
            'product_name' => $row['product_name'],
            'product_category_id' => $row['product_category_id'],
            'price' => $row['price'],
            'stock_quantity' => $row['stock_quantity'],
            'status_id' => $row['status_id']
        );

        $products[] = $product;
    }

    // Output JSON response
    header('Content-Type: application/json');
    echo json_encode($products);
} else {
    // Output error message
    echo "Error: " . $productQuery . "<br>" . $conn->error;
}

// Close the database connection
$conn->close();
?>
