<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="app.js"></script>
</head>

<body class="flex flex-col md:flex-row h-screen bg-gray-50">
    <!-- Side Navigation Bar -->
    <nav class="bg-gray-800 text-white w-full md:w-64 md:h-screen overflow-y-auto">
        <div class="p-4">
            <h1 class="text-2xl font-semibold text-yellow-300"> <i class="fa-solid fa-burger text-yellow-500"></i>
                SnackCraving</h1>
        </div>
        <ul>
            <li id="home-nav" class="p-4 transition duration-300 ease-in-out hover:bg-gray-900 active: bg-gray-950">
                <a href="#" onclick="loadHome('home.php')" class="flex items-center hover:cursor-pointer">
                    <i class="fas fa-home mr-2"></i> Home
                </a>
            </li>
            <li id="menu-nav" class="p-4 transition duration-300 ease-in-out hover:bg-gray-900">
                <a href="#" onclick="loadMenu('menu.html')" class="flex items-center hover:cursor-pointer">
                    <img src="src/icons/menu.png" alt="Menu icon" class="w-6 h-6 mr-2" /> Menu
                </a>
            </li>
            <li id="customer-nav" class="p-4 transition duration-300 ease-in-out hover:bg-gray-900">
                <a href="#" onclick="loadCustomer('customers.html')" class="flex items-center hover:cursor-pointer">
                    <i class="fa-solid fa-users mr-2"></i> Customers
                </a>
            </li>
            <li id="transaction-nav" class="p-4 transition duration-300 ease-in-out hover:bg-gray-900">
                <a href="#" onclick="loadTransaction('transactions.html')"
                    class="flex items-center hover:cursor-pointer">
                    <i class="fa-solid fa-money-bill mr-2"></i> Transactions
                </a>
            </li>
            <li id="admin-nav" class="p-4 transition duration-300 ease-in-out hover:bg-gray-900">
                <a href="#" onclick="loadAdmin('admins.html')" class="flex items-center hover:cursor-pointer">
                    <i class="fa-solid fa-user-tie mr-2"></i> Admins
                </a>
            </li>
        </ul>
    </nav>

    <!-- Main Content -->
    <!-- Dashboard -->
    <div id="content" class="flex-1 p-8">
        <h1 class="text-3xl font-semibold">PRODUCTS</h1>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-200">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Stock Quantity
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    include 'src\fetch_products.php';

                    foreach ($data as $index => $row) {
                        echo "<tr class='odd:bg-white even:bg-gray-200 border-b'>";
                        echo "<th scope='row' class='px-6 py-4 font-medium whitespace-nowrap'>" . $row['product_name'] . "</th>";
                        echo "<td class='px-6 py-4'>" . $row['product_category'] . "</td>";
                        echo "<td class='px-6 py-4'>₱" . $row['price'] . "</td>";
                        echo "<td class='px-6 py-4'>" . $row['stock_quantity'] . "</td>";
                        echo "<td class='px-6 py-4'>" . $row['food_status'] . "</td>";
                        echo "<td class='px-6 py-4'><a href='#' class='font-medium text-blue-600 hover:underline'>Edit</a></td>";
                        echo "</tr>";
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>


</body>

</html>