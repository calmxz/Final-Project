// addProductForm.js
function addProduct() {
    var productForm = document.getElementById('productForm');
    var formData = new FormData(productForm);

    $.ajax({
        url: 'backend/add_product.php', // Change the URL to your PHP script
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log('Product added successfully:', data);

            if (data === 'existing') {
                productForm.reset();
                alert('Product already exists. Please choose a different name.');
            } else {
                // Redirect to menu.php with a fragment identifier to scroll to the bottom
                window.history.back();
            }
        },
        error: function (error) {
            console.error('Error adding product:', error);
        },
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

// Call the function to populate the category dropdown when the page loads
document.addEventListener('DOMContentLoaded', function () {
    populateCategoryDropdown();
});