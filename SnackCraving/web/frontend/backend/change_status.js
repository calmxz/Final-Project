function confirmStatusChange(productId, currentStatus) {
    const confirmationMessage = `Do you want to change the status to ${getOppositeStatus(currentStatus)}?`;
    const confirmation = confirm(confirmationMessage);

    if (confirmation) {
        updateStatus(productId, currentStatus);
    }
}

function getOppositeStatus(currentStatus) {
    return currentStatus === 'Available' ? 'Not Available' : 'Available';
}

function updateStatus(productId, currentStatus) {
    // Simulate an AJAX request
    // You should replace this with an actual AJAX request to change the status on the server
    const newStatus = getOppositeStatus(currentStatus);

    // Replace this with your actual AJAX request to change the status on the server
    // For example, using fetch or XMLHttpRequest
    fetch('change_status.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `productId=${productId}&newStatus=${newStatus}`,
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Update the button text and style
            const button = document.querySelector(`button[data-product-id="${productId}"]`);
            updateButtonAppearance(button, newStatus);

            console.log(`Product ${productId} status changed to ${newStatus}`);
        } else {
            console.error('Error updating status:', data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

function updateButtonAppearance(button, newStatus) {
    button.innerText = newStatus;
    button.classList.toggle('bg-green-500', newStatus === 'Available');
    button.classList.toggle('bg-red-500', newStatus === 'Not Available');
}