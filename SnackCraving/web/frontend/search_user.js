function searchUser(event){
    event.preventDefault();

    const searchTerm = document.getElementById('table-search').value;

    const table = document.querySelector('table tbody');

    table.innerHTML = '';

    $.ajax({
        type: 'POST',
        url: 'backend/search_users.php',
        data: { searchTerm: searchTerm },
        success: function(response) {
            $('#user-table tbody').html(response);
        },
        error: function(error){
            console.error('Error during search:', error);
        }
    });
}