function changeStatus(button) {
    var productId = $(button).data('id');

    // Show confirmation dialog
    var confirmation = confirm('Are you sure you want to change the status?');

    if (confirmation) {
        // Send AJAX request to change_status.php
        $.ajax({
            type: 'POST',
            url: 'backend/change_status.php',
            data: { productId: productId },
            success: function (newStatus) {
                // Update the button text and class to reflect the new status
                $(button).text(newStatus);

                // Optionally, you can also update the button class based on the new status
                var buttonClass = newStatus === 'Available' ? 'bg-green-500' : 'bg-red-500';
                $(button).removeClass('bg-green-500 bg-red-500').addClass(buttonClass);
            },
            error: function (error) {
                console.error('Error changing status:', error);
            }
        });
    }
}