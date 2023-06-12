// Function to calculate the total price
function calculateTotalPrice() {
  let totalPrice = 0;
  cartItems.forEach(function (item) {
    totalPrice += item.price * item.quantity;
  });
  return totalPrice;
}

// Function to update the hidden input field values
// Function to update the hidden input field values
function updateHiddenInputValues() {
  const amountInput = document.querySelector('input[name="amount"]');
  const productNamesInput = document.querySelector('input[name="product_names"]');
  
  amountInput.value = calculateTotalPrice().toString();
  
  // Get an array of product names
  const productNames = cartItems.map(item => item.name);
  productNamesInput.value = productNames.join(','); // Concatenate the product names with a comma separator
}

// Function to display the cart items and update the total price
function displayCartItems() {
  const cartItemsElement = document.getElementById('cart-items');
  const cartBadgeElement = document.getElementById('cart-badge');
  const totalElement = document.getElementById('total');

  cartItemsElement.innerHTML = '';
  cartBadgeElement.textContent = cartItems.length;

  cartItems.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between');
    li.innerHTML = `
      <span>${item.name}</span>
      <strong>₦${(item.price * item.quantity).toFixed(2)}</strong>
    `;
    cartItemsElement.appendChild(li);
  });

  const totalPrice = calculateTotalPrice();
  totalElement.textContent = `₦${totalPrice.toFixed(2)}`;

  // Update the hidden input field values
  updateHiddenInputValues();
}

// Get the cart items from local storage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Display the cart items on page load
displayCartItems();
