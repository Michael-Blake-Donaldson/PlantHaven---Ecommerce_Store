// Mock user database
const users = JSON.parse(localStorage.getItem('users')) || [];

// Sign Up
document.getElementById('signupForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if email exists
    if (users.some(user => user.email === email)) {
        alert('Email already exists!');
        return;
    }

    // Save user
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created! Please log in.');
    window.location.href = 'login.html';
});

document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        alert('Invalid email or password!');
        return;
    }

    // Save logged-in user to sessionStorage
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    alert(`Welcome back, ${user.name}!`);
    window.location.href = './cart.html'; // Redirect to the cart page
});

