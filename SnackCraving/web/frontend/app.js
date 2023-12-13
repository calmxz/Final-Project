function loadHome(page) {
    // Set the active class for the home navbar item
    document.getElementById('home-nav').classList.add('active', 'bg-gray-950');
    document.getElementById('menu-nav').classList.remove('active', 'bg-gray-950');
    document.getElementById('customer-nav').classList.remove('active', 'bg-gray-950');
    document.getElementById('transaction-nav').classList.remove('active', 'bg-gray-950');
    document.getElementById('admin-nav').classList.remove('active', 'bg-gray-950');

    fetch(page)
        .then(response => response.text())
        .then(data => {
            const content = new DOMParser().parseFromString(data, 'text/html').querySelector('#content').innerHTML;
            document.getElementById('content').innerHTML = content;
        })
        .catch(error => console.error('Error:', error));
}

function loadMenu(page){
    document.getElementById('menu-nav').classList.add('active', 'bg-gray-950');
    document.getElementById('home-nav').classList.remove('active', 'bg-gray-950');
    document.getElementById('customer-nav').classList.remove('active', 'bg-gray-950');
    document.getElementById('transaction-nav').classList.remove('active', 'bg-gray-950');
    document.getElementById('admin-nav').classList.remove('active', 'bg-gray-950');   

    fetch(page)
        .then (response => response.text())
        .then (data => {
            const content = new DOMParser().parseFromString(data, 'text/html').querySelector('#content').innerHTML;
            document.getElementById('content').innerHTML = content;
        })
        .catch(error => console.error('Error:', error));
}

function loadCustomer(page) {
    // Set the active class for the customer navbar item
    document.getElementById('customer-nav').classList.add('active', 'bg-gray-950');
    document.getElementById('home-nav').classList.remove('active', 'bg-gray-950');
    document.getElementById('menu-nav').classList.remove('active', 'bg-gray-950');
    document.getElementById('transaction-nav').classList.remove('active', 'bg-gray-950');
    document.getElementById('admin-nav').classList.remove('active', 'bg-gray-950');

    fetch(page)
        .then(response => response.text())
        .then(data => {
            const content = new DOMParser().parseFromString(data, 'text/html').querySelector('#content').innerHTML;
            document.getElementById('content').innerHTML = content;
        })
        .catch(error => console.error('Error:', error));
}

function loadTransaction(page){
    // Set the active class for the transaction navbar item
    document.getElementById('transaction-nav').classList.add('active', 'bg-gray-950');
    document.getElementById('menu-nav').classList.remove('active', 'bg-gray-950');
    document.getElementById('customer-nav').classList.remove('active', 'bg-gray-950');
    document.getElementById('home-nav').classList.remove('active', 'bg-gray-950');
    document.getElementById('admin-nav').classList.remove('active', 'bg-gray-950');

    fetch(page)
        .then(response => response.text())
        .then(data => {
            const content = new DOMParser().parseFromString(data, 'text/html').querySelector('#content').innerHTML;
            document.getElementById('content').innerHTML = content;
        })
        .catch(error => console.error('Error:', error));
}

function loadAdmin(page){
    // Set the active class for the admin navbar item
    document.getElementById('admin-nav').classList.add('active', 'bg-gray-950');
    document.getElementById('menu-nav').classList.remove('active', 'bg-gray-950');
    document.getElementById('customer-nav').classList.remove('active', 'bg-gray-950');
    document.getElementById('transaction-nav').classList.remove('active', 'bg-gray-950');
    document.getElementById('home-nav').classList.remove('active', 'bg-gray-950');

    fetch(page)
        .then(response => response.text())
        .then(data => {
            const content = new DOMParser().parseFromString(data, 'text/html').querySelector('#content').innerHTML;
            document.getElementById('content').innerHTML = content;
        })
        .catch(error => console.error('Error:', error));
}

