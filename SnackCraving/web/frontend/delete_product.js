function deleteProduct(button){
    var productId = $(button).data('id');

    var confirmation = confirm('Are you sure you want to delete this product?');

    if(confirmation){
        $.ajax({
            type: 'POST',
            url: 'backend/delete_product.php',
            data: { productId: productId },
            success: function(response){
                alert(response);
                location.reload();
            },
            error: function(error){
                console.error(error);
                alert("Error deleting product. Please try again.");
            }
        });
    }
}