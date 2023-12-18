// Function to fetch product details by ID
function getProductDetails() {
    // Extract the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // If a valid product ID is present, fetch the details
    if (productId) {
        $.ajax({
            type: 'GET',
            url: 'backend/get_product_details.php',
            data: {
                productId: productId
            },
            success: function (response) {
                const productDetails = JSON.parse(response);
                populateForm(productDetails);
            },
            error: function (error) {
                console.error(error);
                alert("Error fetching product details. Please try again.");
            }
        });
    } else {
        console.error("Invalid product ID in the URL.");
    }
}

// Function to populate the form with product details
function populateForm(productDetails) {
    document.getElementById('productId').value = productDetails.product_id;
    document.getElementById('productName').value = productDetails.product_name;
    document.getElementById('productCategory').value = productDetails.product_category_id;
    document.getElementById('productPrice').value = productDetails.price;
    document.getElementById('stockQuantity').value = productDetails.stock_quantity;
    document.getElementById('productStatus').value = productDetails.status_id;
}

// Function to handle the update button click in updateProduct.html
function updateProduct() {
    // Extract values from the form
    const productId = document.getElementById('productId').value;
    const productName = document.getElementById('productName').value;
    const productCategory = document.getElementById('productCategory').value;
    const productPrice = document.getElementById('productPrice').value;
    const stockQuantity = document.getElementById('stockQuantity').value;
    const productStatus = document.getElementById('productStatus').value;

    // Send an AJAX request to update_product.php
    $.ajax({
        type: 'POST',
        url: 'backend/update_product.php',
        data: {
            productId: productId,
            productName: productName,
            productCategory: productCategory,
            productPrice: productPrice,
            stockQuantity: stockQuantity,
            productStatus: productStatus
        },
        success: function (response) {
            alert(response); // Display the response from update_product.php
            window.location.href = 'menu.php'; // Redirect to the menu page
        },
        error: function (error) {
            console.error(error);
            alert("Error updating product. Please try again.");
        }
    });
}

// Function to populate the category dropdown
function populateCategoryDropdown() {
    var categories = [
        { id: 1, name: 'Burger' },
        { id: 2, name: 'Fries' },
        { id: 3, name: 'Pasta' },
        { id: 4, name: 'Sundae' },
        { id: 5, name: 'Tea' },
        { id: 6, name: 'Drinks' }
    ];

    var categoryDropdown = document.getElementById('productCategory');

    categories.forEach(function (category) {
        var option = document.createElement('option');
        option.value = category.id; // Use the category ID as the option value
        option.textContent = category.name;
        categoryDropdown.appendChild(option);
    });
}

// Function to populate the category dropdown
function populateStatusDropdown() {
    var status = [
        { id: 1, name: 'Available' },
        { id: 2, name: 'Not Available' }
    ];

    var statusDropdown = document.getElementById('productStatus');

    status.forEach(function (status) {
        var option = document.createElement('option');
        option.value = status.id; // Use the category ID as the option value
        option.textContent = status.name;
        statusDropdown.appendChild(option);
    });
}

// Call the function to populate the category dropdown when the page loads
document.addEventListener('DOMContentLoaded', function () {
    populateCategoryDropdown();
    populateStatusDropdown();
    getProductDetails();
});