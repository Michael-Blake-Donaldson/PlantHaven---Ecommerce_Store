const stripe = Stripe('pk_test_51La6B0E5Mr0KG50hEpn4zIfadVXlfFNzwsKTqA3iGJkCcNo9lxzTHH0XvycO0G6rnmMjxdWa9HLKYnEa3OWzQs7B003t8wT1s8');

document.getElementById('checkoutButton').addEventListener('click', () => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser')); // Check if the user is logged in

    if (!loggedInUser) {
        alert('You need to log in to proceed to checkout.');
        window.location.href = './login.html'; // Redirect to the login page
        return;
    }

    // Proceed to Stripe Checkout if the user is logged in
    stripe.redirectToCheckout({
        lineItems: cart.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: item.price,
            },
            quantity: 1,
        })),
        mode: 'payment',
        successUrl: `${window.location.origin}/success.html`,
        cancelUrl: `${window.location.origin}/cart.html`,
    }).then(result => {
        if (result.error) {
            alert(result.error.message);
        }
    });
});

const cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalContainer = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalContainer.innerHTML = '';
        document.getElementById('checkoutButton').style.display = 'none';
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = cart.map(item => {
        total += item.price;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <p class="cart-item-price">$${(item.price / 100).toFixed(2)}</p>
                </div>
            </div>
        `;
    }).join('');

    cartTotalContainer.innerHTML = `<h2>Total: $${(total / 100).toFixed(2)}</h2>`;
    document.getElementById('checkoutButton').style.display = 'block';
}

document.getElementById('checkoutButton').addEventListener('click', () => {
    stripe.redirectToCheckout({
        lineItems: cart.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: item.price,
            },
            quantity: 1,
        })),
        mode: 'payment',
        successUrl: `${window.location.origin}/success.html`,
        cancelUrl: `${window.location.origin}/cart.html`,
    }).then(result => {
        if (result.error) {
            alert(result.error.message);
        }
    });
});

// Initial render
renderCart();
