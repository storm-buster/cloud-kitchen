let cart = [];

// Function to add items to cart
function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);
    
    if(existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: price,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${itemName} added to cart`);
    updateCart();
}

// Function to filter menu items
function filterMenu(category) {
    const menuItems = document.querySelectorAll('.menu-list li');
    
    menuItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block'; // Show item
        } else {
            item.style.display = 'none'; // Hide item
        }
    });
}



// Function to update cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    if(!cartItems) return;

    if(cart.length === 0) {
        cartItems.innerHTML = '<li class="empty-cart">Your cart is empty</li>';
        document.getElementById('total-amount').textContent = '0';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="cart-item-details">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <h3>${item.name}</h3>
                <p>₹${item.price} × ${item.quantity}</p>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
            </div>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    document.getElementById('total-amount').textContent = total;
}

// Function to update quantity
function updateQuantity(index, change) {
    cart[index].quantity += change;
    
    if(cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Function to submit order
function submitOrder(event) {
    event.preventDefault();
    
    if(cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Get form data
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const mobile = document.getElementById('mobile').value;

    // Basic validation
    if (!name || !address || !mobile) {
        alert('Please fill in all delivery details');
        return;
    }

    // Clear cart and localStorage
    cart = [];
    localStorage.removeItem('cart');

    // Redirect to order confirmation page
    window.location.href = 'order-confirmation.html';
}

// Load cart from localStorage when page loads
document.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('cart');
    if(savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCart();
});
