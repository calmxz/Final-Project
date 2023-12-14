// addProductForm.js
function addProduct() {
    var productForm = document.getElementById('productForm');
    var formData = new FormData(productForm);

    // Capitalize the first letter of the product name
    var productName = formData.get('productName');
    formData.set('productName', capitalizeFirstLetter(productName));

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
            }
        },
        error: function (error) {
            console.error('Error adding product:', error);
        },
    });
}

function loadMenu(page){  
    fetch(page)
        .then (response => response.text())
        .then (data => {
            const content = new DOMParser().parseFromString(data, 'text/html').querySelector('#content').innerHTML;
            document.getElementById('content').innerHTML = content;
        })
        .catch(error => console.error('Error:', error));
}


// Function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
