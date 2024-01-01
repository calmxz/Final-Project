<?php
// Include the file for database connection
include 'db_conn.php';

// Check if the searchTerm is set in the POST request
if(isset($_POST['searchTerm'])){
    $searchTerm = mysqli_real_escape_string($conn, $_POST['searchTerm']);

    $searchQuery = "SELECT user_id, CONCAT_WS(' ', first_name, middle_name, last_name) AS full_name, username, hashed_password, email, phone, role_name, balance, created_at 
    FROM users
    LEFT JOIN user_role ON users.role_id = user_role.role_id
    WHERE CONCAT_WS(' ', first_name, middle_name, last_name) LIKE '%$searchTerm%'
    OR username LIKE '%$searchTerm%'
    OR hashed_password LIKE '%$searchTerm%'
    OR email LIKE '%$searchTerm%'
    OR phone LIKE '%$searchTerm%'
    OR balance LIKE '%$searchTerm%'
    OR role_name LIKE '%$searchTerm%'
    OR created_at LIKE '%$searchTerm%'";

    $result = mysqli_query($conn, $searchQuery);

    if($result) {
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);

        foreach ($data as $index => $row) {
            echo "<tr class='odd:bg-white even:bg-gray-100 border-b hover:bg-gray-200'>";
            echo "<td class='px-6 py-4 hidden'>" . $row['user_id'] . "</td>";
            echo "<th scope='row' class='px-6 py-4 font-medium whitespace-nowrap'>" . $row['full_name'] . "</th>";
            echo "<td class='px-6 py-4'>" . $row['username'] . "</td>";
            echo "<td class='px-6 py-4 hidden'>" . $row['hashed_password'] . "</td>";
            echo "<td class='px-6 py-4'>" . $row['email'] . "</td>";
            echo "<td class='px-6 py-4'>" . $row['phone'] . "</td>";

            $roleName = $row['role_name'];
            $buttonClass = $roleName === 'Admin' ? 'bg-green-500' : 'bg-blue-500';

            echo "<td class='px-6 py-4'><button type='button' data-id='" . $row['user_id'] . "' class='text-white p-2 rounded-lg py-2 px-3 $buttonClass'>" . $roleName . "</button></td>";
            echo "<td class='px-6 py-4'>₱" . $row['balance'] . "</td>";
            echo "<td class='px-6 py-4'>" . $row['created_at'] . "</td>";
            echo "<td class='px-6 py-4'>
            <button type='button' data-id='" . $row['user_id'] . "' class='bg-blue-600 text-white p-2 rounded-lg py-2 px-3' onclick='updateButtonClick(this)'>Update</button>
            <button type='button' data-id='" . $row['user_id'] . "' class='bg-red-600 text-white p-2 rounded-lg py-2 px-3' onclick='deleteUser(this)'>Delete</button>
  </td>";
            echo "</tr>";
        }
    } else {
        echo "Error in query: " . mysqli_error($conn);
    }
      // Close the database connection
    mysqli_close($conn);
}
?>