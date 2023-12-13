    function searchMenu(event) {
        event.preventDefault();

        // Get the search input value
        const searchTerm = document.getElementById('table-search').value;

        const table = document.querySelector('table tbody');
        
        table.innerHTML = '';

        // Make an AJAX request to the server with the search term
        $.ajax({
            type: 'POST',
            url: 'backend/search_products.php',
            data: { searchTerm: searchTerm },
            success: function(response) {
                // Update the table with the matched results
                $('#product-table tbody').html(response);
            },
            error: function(error) {
                console.error('Error during search:', error);
            }
        });
    }