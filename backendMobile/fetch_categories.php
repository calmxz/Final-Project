<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$CN = mysqli_connect("192.168.1.117", "root", "1234", "sc_db", 3306);

if (!$CN) {
    die("Connection failed: " . mysqli_connect_error());
}

$categoryQuery = "SELECT * FROM category ORDER BY product_category_id ASC";
$categoryResult = mysqli_query($CN, $categoryQuery);

if (!$categoryResult) {
    $Message = "Query failed: " . mysqli_error($CN);
    $Response = array("message" => $Message, "categories" => []);
} else {    
    $categories = array();

    while ($row = mysqli_fetch_assoc($categoryResult)) {
        $categories[] = $row;
    }

    $Response = array("categories" => $categories);
}

echo json_encode($Response);

mysqli_close($CN);
?>