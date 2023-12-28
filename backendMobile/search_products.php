<?php
// Enable CORS and set headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Include database connection
include('db_connection.php');

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if the 'searchKey' parameter is present in the URL
    if (isset($_GET['searchKey'])) {
        // Sanitize the search key using prepared statements
        $searchKey = mysqli_real_escape_string($conn, $_GET['searchKey']);

        // Perform a search query based on the 'searchKey' parameter using a prepared statement
        $query = "SELECT * FROM product WHERE product_name LIKE ?";
        
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $searchKey);
        $stmt->execute();

        // Check for errors in the SQL query execution
        if (!$stmt) {
            echo json_encode(array("error" => "Error in SQL query: " . $conn->error));
            die();
        }

        $result = $stmt->get_result();

        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        echo json_encode($data);
    } else {
        // If 'searchKey' parameter is not present, return an empty array
        echo json_encode(array());
    }
} else {
    // If the request method is not GET, return an error response
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("message" => "Invalid request method"));
}

// Close the database connection
$conn->close();
?>