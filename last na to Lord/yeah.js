let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const count = cart.length;
  const els = document.querySelectorAll(".cart-count");
  els.forEach(el => el.textContent = `Cart (${count})`);
}

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  displayCart(); // avoid reloading the page
}

function displayCart() {
  const cartContainer = document.getElementById("cart-items");
  const emptyMsg = document.getElementById("empty-cart");
  const checkoutForm = document.getElementById("checkout-form");
  const cartTotal = document.getElementById("cart-total");

  cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = "";
  cartTotal.innerHTML = "";

  if (cart.length === 0) {
    emptyMsg.style.display = "block";
    if (checkoutForm) checkoutForm.style.display = "none";
    return;
  }

  emptyMsg.style.display = "none";
  if (checkoutForm) checkoutForm.style.display = "block";

  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <p>${item.name} - ₱${item.price}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartContainer.appendChild(div);
    total += item.price;
  });

  cartTotal.textContent = "Total: ₱" + total;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  displayCart();
});



