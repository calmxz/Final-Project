<?php
// Include the file for database connection
include 'db_conn.php';

// Check if the searchTerm is set in the POST request
if (isset($_POST['searchTerm'])) {
    // Sanitize the input to prevent SQL injection
    $searchTerm = mysqli_real_escape_string($conn, $_POST['searchTerm']);

    // Your SQL query for searching products by name
    $query = "SELECT * FROM food_menu WHERE product_name LIKE '%$searchTerm%' OR product_category LIKE '%$searchTerm%' OR price LIKE '%$searchTerm%' OR stock_quantity LIKE '%$searchTerm%' OR food_status LIKE '%$searchTerm%' ";
    
    $result = mysqli_query($conn, $query);

    if ($result) {
        // Fetch the results into an array
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);

        // Generate HTML for the matched results
        foreach ($data as $index => $row) {
            echo "<tr class='odd:bg-white even:bg-gray-200 border-b hover:bg-gray-100'>";
            echo "<td class='px-6 py-4 hidden'>" . $row['product_id'] . "</td>";
            echo "<th scope='row' class='px-6 py-4 font-medium whitespace-nowrap'>" . $row['product_name'] . "</th>";
            echo "<td class='px-6 py-4'>" . $row['product_category'] . "</td>";
            echo "<td class='px-6 py-4'>₱" . $row['price'] . "</td>";
            echo "<td class='px-6 py-4'>" . $row['stock_quantity'] . "</td>";

            $foodStatus = $row['food_status'];
            $buttonClass = $foodStatus === 'Available' ? 'bg-green-500' : 'bg-red-500';
            echo "<td class='px-6 py-4'><button type='button' onclick=changeStatus(event) class='text-white p-2 rounded-lg py-2 px-3 $buttonClass'>" . $foodStatus . "</button></td>";

            echo "<td class='px-6 py-4'><a href='#' class='font-medium text-blue-600 hover:underline'>Edit</a></td>";
            echo "</tr>";
        }
    } else {
        echo "Error in query: " . mysqli_error($conn);
    }

    // Close the database connection
    mysqli_close($conn);
}
?>