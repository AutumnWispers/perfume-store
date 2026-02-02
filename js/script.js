/* ---------- PRODUCT DATA ---------- */
const products = [
  { id: 1, name: "Woody Musk", price: 1499, image: "images/perfumes/woody.jpg", description: "Deep woody musky fragrance." },
  { id: 2, name: "Floral Bloom", price: 1299, image: "images/perfumes/floral.jpg", description: "Soft floral elegance." },
  { id: 3, name: "Citrus Fresh", price: 999, image: "images/perfumes/citrus.jpg", description: "Fresh citrus energy." },
  { id: 4, name: "Ocean Breeze", price: 1199, image: "images/perfumes/ocean.jpg", description: "Cool aquatic notes." },
  { id: 5, name: "Spicy Oud", price: 1799, image: "images/perfumes/oud.jpg", description: "Rich spicy oud fragrance." }
];

/* ---------- CART FUNCTIONS ---------- */
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(name, price) {
  const cart = getCart();
  cart.push({ name, price });
  saveCart(cart);
  alert(name + " added to cart 🛒");
}

/* ---------- PRODUCT PAGE ---------- */
function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const product = products.find(p => p.id === id);
  if (!product) return;

  document.getElementById("product-image").src = product.image;
  document.getElementById("product-name").innerText = product.name;
  document.getElementById("product-price").innerText = "₹" + product.price;
  document.getElementById("product-desc").innerText = product.description;

  document.getElementById("add-btn").onclick = function () {
    addToCart(product.name, product.price);
  };
}

/* ---------- CART PAGE ---------- */
function loadCart() {
  const cart = getCart();
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  if (!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price;
    cartItems.innerHTML += `<div>${item.name} - ₹${item.price}</div>`;
  });

  totalEl.innerText = "₹" + total;
}

/* ---------- CART COUNT ---------- */
function updateCartCount() {
  const count = getCart().length;
  document.querySelectorAll("#cart-count").forEach(el => {
    el.innerText = count;
  });
}

updateCartCount();
