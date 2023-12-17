// Function to prepopulate the form with user details
function getUserDetails() {
    // Extract user ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    // Check if user ID is available
    if (userId) {
        // Fetch user details using AJAX
        $.ajax({
            type: 'GET',
            url: `backend/get_user_details.php`,
            data: {
                userId: userId
            },
            success: function (response) {
                const userDetails = JSON.parse(response);
                populateForm(userDetails);
            },
            error: function () {
                alert('Error fetching user details');
            }
        });
    }
}

function populateForm(userDetails){
    document.getElementById('userId').value = userDetails.user_id;
    document.getElementById('firstName').value = userDetails.first_name;
    document.getElementById('middleName').value = userDetails.middle_name;
    document.getElementById('lastName').value = userDetails.last_name;
    document.getElementById('username').value = userDetails.username;
    document.getElementById('email').value = userDetails.email;
    document.getElementById('phone').value = userDetails.phone;
}

// Call the getUserDetails function when the page is loaded
$(document).ready(function () {
    getUserDetails();
});

function updateUser() {
    // Get user input
    const userId = document.getElementById('userId').value;
    const firstName = document.getElementById("firstName").value;
    const middleName = document.getElementById("middleName").value;
    const lastName = document.getElementById("lastName").value;
    const username = document.getElementById("username").value;
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    // Send data to the server
    $.ajax({
        type: 'POST',
        url: 'backend/update_user.php',
        data: {
            userId: userId,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            username: username,
            oldPassword: oldPassword,
            newPassword: newPassword,
            email: email,
            phone: phone,
        },
        success: function (response) {
            // Check the response for success or error
            if (response.startsWith("User information updated successfully")) {
               alert(response);
                // Redirect to users.php or handle success accordingly
                window.location.href = 'users.php';
            } else {
                alert("Error updating user: " + response);
                // Handle the error, e.g., display an error message to the user
            }
        },
        error: function (error) {
            console.error("Error updating user: ", error);
            // Handle the error, e.g., display an error message to the user
        },
    });
}