document.addEventListener('DOMContentLoaded', () => {
    fetch('/admin/orders')
        .then(response => response.json())
        .then(orders => {
            const orderList = document.getElementById('order-list');
            orderList.innerHTML = ''; // Clear any existing hardcoded orders
            orders.forEach(order => {
                const listItem = document.createElement('li');
                listItem.textContent = `Name: ${order.name}, Address: ${order.address}, Mobile: ${order.mobile}, Items: ${order.items.join(', ')}`;
                orderList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching orders:', error));
});
