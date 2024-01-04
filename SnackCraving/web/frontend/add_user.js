function addUser() {
    // Collect form data
    var formData = {
        firstName: $('#firstName').val(),
        middleName: $('#middleName').val(),
        lastName: $('#lastName').val(),
        username: $('#username').val(),
        password: $('#password').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
    };

    // Send data to the PHP script using AJAX
    $.ajax({
        url: 'backend/add_user.php',
        method: 'POST',
        data: formData,
        dataType: 'json', // Expect JSON response
        success: function (data) {
            if (data.message === 'Duplicate entry found.') {
                // Display more specific alert
                alert(data.message + ' The following fields are duplicated: ' + data.duplicatedFields.join(', '));
                // Clear the form
                $('#userForm')[0].reset();
            } else {
                // User added successfully
                console.log('User added successfully:', data.message);
                window.location.href = 'users.php';
            }
        },
        error: function (error) {
            console.error('Error adding user:', error);
        }
    });
}