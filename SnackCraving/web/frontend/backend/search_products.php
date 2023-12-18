<?php
// Include the file for database connection
include 'db_conn.php';

// Check if the searchTerm is set in the POST request
if (isset($_POST['searchTerm'])) {
    // Sanitize the input to prevent SQL injection
    $searchTerm = mysqli_real_escape_string($conn, $_POST['searchTerm']);

    // Your SQL query for searching products by name
    $searchQuery = "SELECT p.product_id, p.product_name, c.product_category, p.price, p.stock_quantity, ps.food_status
                    FROM product p
                    LEFT JOIN category c ON p.product_category_id = c.product_category_id
                    LEFT JOIN product_status ps ON p.status_id = ps.status_id
                    WHERE p.product_name LIKE '%$searchTerm%' 
                    OR c.product_category LIKE '%$searchTerm%'
                    OR p.price LIKE '%$searchTerm%' 
                    OR p.stock_quantity LIKE '%$searchTerm%' 
                    OR ps.food_status LIKE '%$searchTerm%'";

    $result = mysqli_query($conn, $searchQuery);

    if ($result) {
        // Fetch the results into an array
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);

        // Generate HTML for the matched results
        foreach ($data as $index => $row) {
            echo "<tr class='odd:bg-white even:bg-gray-100 border-b hover:bg-gray-200'>";
            echo "<td class='px-6 py-4 hidden'>" . $row['product_id'] . "</td>";
            echo "<th scope='row' class='px-6 py-4 font-medium whitespace-nowrap'>" . $row['product_name'] . "</th>";
            echo "<td class='px-6 py-4'>" . $row['product_category'] . "</td>";
            echo "<td class='px-6 py-4'>₱" . $row['price'] . "</td>";
            echo "<td class='px-6 py-4'>" . $row['stock_quantity'] . "</td>";

            $foodStatus = $row['food_status'];
            $buttonClass = $foodStatus === 'Available' ? 'bg-green-500' : 'bg-red-500';

            echo "<td class='px-6 py-4'><button type='button' data-id='" . $row['product_id'] . "' class='text-white p-2 rounded-lg py-2 px-3 $buttonClass' onclick='changeStatus(this)'>" . $foodStatus . "</button></td>";
            echo "<td class='px-6 py-4'>
            <button type='button' class='bg-blue-600 text-white p-2 rounded-lg py-2 px-3' onclick='editProduct(" . $row['product_id'] . ")'>Update</button>
            <button type='button' class='bg-red-600 text-white p-2 rounded-lg py-2 px-3' onclick='deleteProduct(" . $row['product_id'] . ")'>Delete</button>
  </td>";
            echo "</tr>";
        }
    } else {
        echo "Error in query: " . mysqli_error($conn);
    }

    // Close the database connection
    mysqli_close($conn);
}
