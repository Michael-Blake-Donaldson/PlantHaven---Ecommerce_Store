const stripe = Stripe('pk_test_51La6B0E5Mr0KG50hEpn4zIfadVXlfFNzwsKTqA3iGJkCcNo9lxzTHH0XvycO0G6rnmMjxdWa9HLKYnEa3OWzQs7B003t8wT1s8');
const plants = [
  {
    id: 1,
    name: "Chinese Evergreen",
    price: 2999,
    image: "./assets/chinesevergreen.webp",
    category: "indoor",
    region: "tropical",
    difficulty: "medium",
    care: "Bright indirect light, moderate watering"
  },
  {
    id: 2,
    name: "Fiddle Leaf Fig",
    price: 3999,
    image: "./assets/FiddleLeafFig.jpg",
    category: "rare",
    region: "tropical",
    difficulty: "hard",
    care: "Bright filtered light, consistent watering"
  },
  {
    id: 3,
    name: "Money Tree",
    price: 5999,
    image: "./assets/MoneyTree.jpg",
    category: "indoor",
    region: "South America",
    difficulty: "easy",
    care: "Bright inderect sunlight, Light watering"
  },
  {
    id: 4,
    name: "Dieffenbachia",
    price: 1999,
    image: "./assets/Dieffenbachia.jpg",
    category: "indoor",
    region: "South America",
    difficulty: "easy",
    care: "Low Light, Light watering"
  }
];

function renderPlants(filteredPlants = plants) {
  const container = document.getElementById('plantsContainer');
  container.innerHTML = filteredPlants.map(plant => `
    <div class="plant-card glass-effect">
      <div class="plant-image" style="background-image: url('${plant.image}')"></div>
      <div class="plant-content">
        <h3 class="plant-title">${plant.name}</h3>
        <p class="plant-details">${plant.care}</p>
        <div class="difficulty ${plant.difficulty}">${plant.difficulty.charAt(0).toUpperCase() + plant.difficulty.slice(1)}</div>
        <p class="plant-details">Region: ${plant.region.charAt(0).toUpperCase() + plant.region.slice(1)}</p>
        <p class="plant-details">$${(plant.price / 100).toFixed(2)}</p>
        <button class="buy-button" onclick="addToCart(${plant.id})">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

function filterPlants() {
  const name = document.getElementById('nameFilter').value.toLowerCase();
  const region = document.getElementById('regionFilter').value;
  const category = document.getElementById('categoryFilter').value;
  const difficulty = document.getElementById('difficultyFilter').value;

  const filtered = plants.filter(plant => 
    plant.name.toLowerCase().includes(name) &&
    (!region || plant.region === region) &&
    (!category || plant.category === category) &&
    (!difficulty || plant.difficulty === difficulty)
  );

  renderPlants(filtered);
}

// Add event listeners to all filters
document.querySelectorAll('.filter-input').forEach(input => {
  input.addEventListener('change', filterPlants);
  input.addEventListener('keyup', filterPlants);
});

// Initial render
renderPlants();

let cart = [];

function addToCart(plantId) {
  const plant = plants.find(p => p.id === plantId);
  if (plant) {
    cart.push(plant);
    updateCartCount();
    alert(`${plant.name} added to cart!`);
  }
}

function updateCartCount() {
  const cartLink = document.querySelector('.nav-links a');
  cartLink.textContent = `Cart (${cart.length})`;
}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser')); // Retrieve logged-in user from session storage

    if (loggedInUser) {
        // Display welcome message if user is logged in
        navLinks.innerHTML += `<span>Welcome, ${loggedInUser.name}</span>`;
    } else {
        // Display login link if user is not logged in
        navLinks.innerHTML += `<a href="login.html">Log In</a>`;
    }
});