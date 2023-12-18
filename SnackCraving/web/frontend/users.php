<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="app.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="search_user.js"></script>
    <script src="delete_user.js"></script>
</head>
<body>
     <!-- Side Navigation Bar -->
     <nav class="fixed bg-gray-800 text-white w-64 h-full overflow-y-auto">
        <div class="p-4">
            <h1 class="text-2xl font-semibold text-yellow-300"> <i class="fa-solid fa-burger text-yellow-500"></i>
                SnackCraving</h1>
        </div>
        <ul>
            <li id="home-nav" class="p-4 transition duration-300 ease-in-out hover:bg-gray-900">
                <a href="home.html" onclick="loadHome('home.html')" class="flex items-center hover:cursor-pointer">
                    <i class="fas fa-home mr-2"></i> Home
                </a>
            </li>
            <li id="menu-nav" class="p-4 transition duration-300 ease-in-out hover:bg-gray-900">
                <a href="menu.php" onclick="loadMenu('menu.php')" class="flex items-center hover:cursor-pointer">
                    <img src="backend/icons/menu.png" alt="Menu icon" class="w-6 h-6 mr-2" /> Menu
                </a>
            </li>
            <li id="customer-nav" class="p-4 transition duration-300 ease-in-out hover:bg-gray-900 active: bg-gray-950"> 
                <a href="users.php" onclick="loadUsers('users.php')" class="flex items-center hover:cursor-pointer">
                    <i class="fa-solid fa-users mr-2"></i> Users
                </a>
            </li>
            <li id="transaction-nav" class="p-4 transition duration-300 ease-in-out hover:bg-gray-900">
                <a href="transactions.html" onclick="loadTransaction('transactions.html')"
                    class="flex items-center hover:cursor-pointer">
                    <i class="fa-solid fa-money-bill mr-2"></i> Transactions
                </a>
            </li>
            <li id="admins.html" class="p-4 transition duration-300 ease-in-out hover:bg-gray-900">
                <a href="admins.html" onclick="loadAdmin('admins.html')" class="flex items-center hover:cursor-pointer">
                    <i class="fa-solid fa-user-tie mr-2"></i> Admins
                </a>
            </li>
        </ul>
    </nav>
    
    <!-- Main Content -->
    <!-- Dashboard -->
<div id="content" class="flex-1 p-8 ml-64"> <!-- Adjust margin to match the width of the nav -->
    <h1 class="text-3xl font-semibold">Users</h1>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="flex pb-4 pt-4 bg-white">
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative mt-1 flex ml-2">
                <div class="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="text" id="table-search"
                    class="block py-1.5 pl-10 text-base text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search for users">
                <button class="bg-blue-500 ml-2 py-1.5 px-4 rounded-lg text-white"
                    onclick="searchUser(event)">Search</button>
                <!-- Added some margin and padding to align with the input -->
                <button class="bg-blue-500 ml-80 py-1.5 px-4 rounded-lg text-white"
                    onclick="redirectToAddUserForm('addUser.html')">Add Admin</button>
            </div>
        </div>

        <table id="user-table" class="w-full text-sm text-left text-gray-900">
            <thead class="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                    <th scope="col" class="hidden px-6 py-3">
                        ID
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Full Name 
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Username 
                    </th>
                    <th scope="col" class="hidden px-6 py-3">
                        Password 
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Email 
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Phone number 
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Role
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Date Created
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>

            <tbody> 
                <?php
                // Include the file for fetching users
                include 'backend/fetch_users.php';
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
                    echo "<td class='px-6 py-4'>" . $row['created_at'] . "</td>";
                    echo "<td class='px-6 py-4'>
                    <button type='button' data-id='" . $row['user_id'] . "' class='bg-blue-600 text-white p-2 rounded-lg py-2 px-3' onclick='updateButtonClick(this)'>Update</button>
                    <button type='button' data-id='" . $row['user_id'] . "' class='bg-red-600 text-white p-2 rounded-lg py-2 px-3' onclick='deleteUser(this)'>Delete</button>
          </td>";
                    echo "</tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
</div>
<script>
    function redirectToAddUserForm(page){
        window.location.href = page;
    }

// Function to handle the update button click in menu.php
function updateButtonClick(button) {
    const isConfirmed = confirm("Are you sure you want to update this user?");
    
    if (isConfirmed) {
        const userId = button.getAttribute('data-id');
        window.location.href = `updateUser.html?id=${userId}`;
    }
}
</script>
</body>
</html>