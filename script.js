// List of products - add more here as needed
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Experience high-quality sound with noise cancellation and long battery life.",
    price: 99.99,
    image: "https://via.placeholder.com/250?text=Headphones",
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Track your fitness and notifications with this stylish smartwatch.",
    price: 149.99,
    image: "https://via.placeholder.com/250?text=Smart+Watch",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    description: "Portable speaker with rich sound and deep bass.",
    price: 59.99,
    image: "https://via.placeholder.com/250?text=Speaker",
  },
  {
    id: 4,
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with fast response time.",
    price: 29.99,
    image: "https://via.placeholder.com/250?text=Wireless+Mouse",
  },
];

// Render products on page
function renderProducts() {
  const container = document.getElementById("productsGrid");
  container.innerHTML = ""; // Clear existing

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        <div class="cart-msg" id="msg-${product.id}"></div>
      </div>
    `;

    container.appendChild(card);
  });
}

// Add product to cart in localStorage
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  return true;
}

// Setup event listeners for Add to Cart buttons
function setupCartButtons() {
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);
      if (addToCart(id)) {
        const msgDiv = document.getElementById(`msg-${id}`);
        msgDiv.textContent = "✅ Added to cart!";
        setTimeout(() => {
          msgDiv.textContent = "";
        }, 1500);
      }
    });
  });
}

// Factorial functions
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function factorialRecursive(n) {
  if (n <= 1) return 1;
  return n * factorialRecursive(n - 1);
}

// Factorial form handling
document.getElementById("factorialForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const number = parseInt(document.getElementById("numberInput").value);
  const method = document.getElementById("methodSelect").value;
  const output = document.getElementById("output");

  if (isNaN(number) || number < 0) {
    output.textContent = "❌ Please enter a valid non-negative integer.";
    return;
  }

  let result;
  if (method === "iterative") {
    result = factorialIterative(number);
  } else {
    result = factorialRecursive(number);
  }

  output.textContent = `✅ Factorial of ${number} using ${method} method is ${result}`;
});

// Initialize page
renderProducts();
setupCartButtons();
