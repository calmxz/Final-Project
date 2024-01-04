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
   
</head>
<body>
     <!-- Side Navigation Bar -->
     <nav class="fixed bg-gray-800 text-white w-64 h-full overflow-y-auto">
        <div class="p-4">
            <h1 class="text-2xl font-semibold text-yellow-300 flex items-center"> 
                <img src="backend\icons\S.C. LOGO (1).png" alt="App logo" class="w-16 h-16 mr-2 ">
                SnackCraving
            </h1>
        </div>
        <ul>
            <li id="home-nav" class="p-4 transition duration-300 ease-in-out hover:bg-gray-900">
                <a href="home.html" onclick="loadHome('home.html')" class="flex items-center hover:cursor-pointer">
                <i class="fa-solid fa-gauge mr-2"></i> Dashboard
                </a>
            </li>
            <li id="menu-nav" class="p-4 transition duration-300 ease-in-out hover:bg-gray-900">
                <a href="menu.php" onclick="loadMenu('menu.php')" class="flex items-center hover:cursor-pointer">
                    <img src="backend/icons/menu.png" alt="Menu icon" class="w-6 h-6 mr-2" /> Menu
                </a>
            </li>
            <li id="customer-nav" class="p-4 transition duration-300 ease-in-out hover:bg-gray-900"> 
                <a href="users.php" onclick="loadUsers('users.php')" class="flex items-center hover:cursor-pointer">
                    <i class="fa-solid fa-users mr-2"></i> Users
                </a>
            </li>
            <li id="transaction-nav" class="p-4 transition duration-300 ease-in-out hover:bg-gray-900 active: bg-gray-950">
                <a href="transactions.php" onclick="loadTransaction('transactions.php')"
                    class="flex items-center hover:cursor-pointer">
                    <i class="fa-solid fa-money-bill mr-2"></i> Transactions
                </a>
            </li>
            <li id="admins.html" class="p-4 transition duration-300 ease-in-out hover:bg-gray-900">
                <a href="admins.html" onclick="loadAdmin('admins.html')" class="flex items-center hover:cursor-pointer">
                <i class="fa-solid fa-right-to-bracket mr-2"></i> Login
                </a>
            </li>
        </ul>
    </nav>
    
    <!-- Main Content -->
    <!-- Dashboard -->
    <div id="content" class="flex-1 p-8 ml-64"> <!-- Adjust margin to match the width of the nav -->
        <h1 class="text-3xl font-semibold">ORDERS PAGE</h1>
        <table id="product-table" class="w-full text-sm text-left text-gray-900">
            <thead class="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                    <th scope="col" class="hidden px-6 py-3">
                        ID
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Username
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Product Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Quantity
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Total Amount
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Amount Paid
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Change
                    </th>
                    <th scope="col" class="px-6 py-3">
                        date Ordered
                    </th>
                </tr>
            </thead>

            <tbody> 
                <?php
                // Include the file for fetching products
                include 'backend/fetch_orders.php';
                foreach ($data as $index => $row) {
                    echo "<tr class='odd:bg-white even:bg-gray-100 border-b hover:bg-gray-200'>";
                    echo "<td class='px-6 py-4 hidden'>" . $row['order_id'] . "</td>";
                    echo "<th scope='row' class='px-6 py-4 font-medium whitespace-nowrap'>" . $row['user_name'] . "</th>";
                    echo "<td class='px-6 py-4'>" . $row['product_name'] . "</td>";
                    echo "<td class='px-6 py-4'>" . $row['quantity'] . "</td>";
                    echo "<td class='px-6 py-4'>₱" . $row['total_amount'] . "</td>";
                    echo "<td class='px-6 py-4'>₱" . $row['amount_paid'] . "</td>";
                    echo "<td class='px-6 py-4'>₱" . $row['change_amount'] . "</td>";
                    echo "<td class='px-6 py-4'>" . $row['date_ordered'] . "</td>";
                    echo "</tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
</div>
    </div>
</body>