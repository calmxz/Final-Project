<?php
// Include the file for fetching products
include 'src/fetch_products.php';

// Include the file for handling search logic
include 'src/search_products.php';

include 'src/change_status.php'
?>
<!-- Main Content -->
<!-- Dashboard -->
<div id="content" class="flex-1 p-8">
    <h1 class="text-3xl font-semibold">PRODUCTS</h1>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="flex pb-4 pt-4 bg-white"> 
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative mt-1 flex"> 
                <div class="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="text" id="table-search" class="block py-1.5 pl-10 text-base text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for items">
                <button class="bg-blue-500 ml-2 py-1.5 px-4 rounded-lg text-white" onclick="searchMenu(event)">Search</button> <!-- Added some margin and padding to align with the input -->
            </div>
        </div>


        <table id="product-table" class="w-full text-sm text-left text-gray-900">
            <thead class="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                    <th scope="col" class="hidden px-6 py-3">
                        ID
                    </th>
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
                foreach ($data as $index => $row) {
                    echo "<tr class='odd:bg-white even:bg-gray-200 border-b hover:bg-gray-100'>";
                    echo "<td class='px-6 py-4 hidden'>" . $row['product_id'] . "</td>";
                    echo "<th scope='row' class='px-6 py-4 font-medium whitespace-nowrap'>" . $row['product_name'] . "</th>";
                    echo "<td class='px-6 py-4'>" . $row['product_category'] . "</td>";
                    echo "<td class='px-6 py-4'>₱" . $row['price'] . "</td>";
                    echo "<td class='px-6 py-4'>" . $row['stock_quantity'] . "</td>";

                    $foodStatus = $row['food_status'];
                    $buttonClass = $foodStatus === 'Available' ? 'bg-green-500' : 'bg-red-500';

                    
                    echo "<td class='px-6 py-4'><button type='button' $foodStatus)' class='text-white p-2 rounded-lg py-2 px-3 $buttonClass'>" . $foodStatus . "</button></td>";
                    echo "<td class='px-6 py-4'>
            <button type='button' class='text-blue-600 hover:underline' onclick='editProduct(" . $row['product_id'] . ")'>Edit</button>
            <button type='button' class='text-red-600 hover:underline' onclick='deleteProduct(" . $row['product_id'] . ")'>Delete</button>
          </td>";
                    echo "</tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
</div>
<script src="search_product.js"></script>
<script src="change_status.js"></script>