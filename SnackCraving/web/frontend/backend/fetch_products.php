<?php
// Include the database connection file
include 'db_conn.php';

// DataTables parameters
$columns = array(
    0 => 'product_id', // Add more columns as needed
    1 => 'product_name',
    2 => 'product_category',
    3 => 'price',
    4 => 'stock_quantity',
    5 => 'food_status',
);

// Fetch data from the food_menu table
$sql = "SELECT * FROM food_menu";

// Count total records without filtering
$result = $conn->query($sql);
$totalRecords = $result->num_rows;

// Apply sorting
if (isset($_POST['order'])) {
    $orderColumn = $columns[$_POST['order'][0]['column']];
    $orderDirection = $_POST['order'][0]['dir'];
    $sql .= " ORDER BY $orderColumn $orderDirection";
}

// Apply pagination
if (isset($_POST['start'], $_POST['length'])) {
    $start = $_POST['start'];
    $length = $_POST['length'];
    $sql .= " LIMIT $start, $length";
}

// Execute the SQL query
$result = $conn->query($sql);

// Fetch and store data in an array
$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Close the database connection
$conn->close();

// Prepare response for DataTables
$response = array(
    "data" => $data,
    "recordsTotal" => $totalRecords,
    "recordsFiltered" => $totalRecords,
);

echo json_encode($response);
?>
