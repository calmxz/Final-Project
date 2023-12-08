<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" integrity="sha512-Avb2QiuDEEvB4bZJYdft2mNjVShBftLdPG8FJ0V7irTLQ8Uo0qcPxh4Plq7G5tGm0rU+1SPhVotteLpBERwTkw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="app.js"></script>
</head>
<body class="flex flex-col md:flex-row h-screen bg-gray-50">
    <!-- Side Navigation Bar -->
    <nav class="bg-gray-800 text-white w-full md:w-64 md:h-screen overflow-y-auto">
        <div class="p-4">
            <h1 class="text-2xl font-semibold text-yellow-300"> <i class="fa-solid fa-burger text-yellow-500"></i> SnackCraving</h1>
        </div>
        <ul>
            <li id="home-nav" class="p-4 transition duration-300 ease-in-out hover:bg-gray-900 active: bg-gray-950">
                <a href="#" onclick="loadHome('home.html')" class="flex items-center hover:cursor-pointer">
                    <i class="fas fa-home mr-2"></i> Home
                </a>
            </li>
            <li id="home-nav" class="p-4 transition duration-300 ease-in-out hover:bg-gray-90">
                <a href="#" onclick="loadHome('home.html')" class="flex items-center hover:cursor-pointer">
                    <i class="fa-solid fa-burger-fries"></i> Menu
                </a>
            </li>
            <li id="customer-nav" class="p-4 transition duration-300 ease-in-out hover:bg-gray-900">
                <a href="#" onclick="loadCustomer('customers.html')" class="flex items-center hover:cursor-pointer">
                    <i class="fa-solid fa-users mr-2"></i> Customers
                </a>
            </li>
            <li id="transaction-nav" class="p-4 transition duration-300 ease-in-out hover:bg-gray-900">
                <a href="#" onclick="loadTransaction('transactions.html')" class="flex items-center hover:cursor-pointer">
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
    <h1 class="text-3xl font-semibold">HOME/DASHBOARD</h1>

    <div>
    <table class="w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl border-collapse m-auto border border-gray-200 p-5">
            <thead class="bg-gray-50 border-b-2 border-gray-300">
                <tr>
                    <th class="p-3 font-semibold text-left">ID</th>
                    <th class="p-3 font-semibold text-left">Category</th>
                </tr>
            </thead>

            <tbody class ="divide-y divide-gray-100">
                <?php
                include 'src\fetch_data.php';

                foreach ($data as $index => $row) {
                    $rowClass = $index % 2 === 0 ? 'bg-gray-200' : '';
                    echo "<tr class='$rowClass'>";
                    echo "<td class='p-3 text-left text-gray-700 whitespace-nowrap'>" . $row['product_category_id'] . "</td>";
                    echo "<td class='p-3 text-left text-gray-700'>" . $row['product_category'] . "</td>";
                    echo "</tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
</div>


</body>
</html>
