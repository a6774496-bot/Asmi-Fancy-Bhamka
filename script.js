// Navigation smooth scroll & active link
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    document.querySelector(link.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
    closeCartModal();
  });
});

// Cart functionality
const cart = [];
const cartBtn = document.getElementById('cart');
const cartModal = document.getElementById('cart-modal');
const cartItemsDiv = document.getElementById('cart-items');
const cartTotalDiv = document.getElementById('cart-total');
const closeCartBtn = document.getElementById('close-cart');

function updateCartCount() {
  cartBtn.textContent = `🛒 Cart (${cart.length})`;
}

function renderCart() {
  cartItemsDiv.innerHTML = '';
  let total = 0;
  cart.forEach((item, idx) => {
    total += item.price;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      ${item.name} - Rs. ${item.price}
      <button onclick="removeFromCart(${idx})">x</button>
    `;
    cartItemsDiv.appendChild(div);
  });
  cartTotalDiv.textContent = `Total: Rs. ${total}`;
}

function addToCart(name, price) {
  cart.push({name, price});
  updateCartCount();
  renderCart();
  alert(`${name} added to cart!`);
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  updateCartCount();
  renderCart();
}

function toggleCartModal() {
  if (cartModal.style.display === 'block') {
    cartModal.style.display = 'none';
  } else {
    cartModal.style.display = 'block';
  }
}

function closeCartModal() {
  cartModal.style.display = 'none';
}

cartBtn.addEventListener('click', toggleCartModal);
closeCartBtn.addEventListener('click', closeCartModal);

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', e => {
    const card = e.target.closest('.product-card');
    const name = card.getAttribute('data-name');
    const price = parseInt(card.getAttribute('data-price'));
    addToCart(name, price);
  });
});
