function deleteUser(button){
    var userId = $(button).data('id');

    var confirmation = confirm('Are you sure you want to delete this user?');

    if(confirmation){
        $.ajax({
            type: 'POST',
            url: 'backend/delete_user.php',
            data: { userId: userId },
            success: function(response){
                alert(response);
                window.location.reload();    
            },
            error: function(error){
                console.error(error);
                alert("Error deleting user. Please try again.");
            }
        });
    }
}