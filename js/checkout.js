// Function to calculate the total price
function calculateTotalPrice() {
  let totalPrice = 0;
  cartItems.forEach(function (item) {
    totalPrice += item.price * item.quantity;
  });
  return totalPrice;
}

// Function to update the hidden input field values
function updateHiddenInputValues() {
  const amountInput = document.querySelector('input[name="amount"]');
  const productNamesInput = document.querySelector('input[name="product_names"]');
  const addressInput = document.querySelector('input[name="customer[Address]"]');
  const totalAmount = calculateTotalPrice();

  amountInput.value = totalAmount.toString();
  productNamesInput.value = cartItems.map(item => item.name).join(',');
  addressInput.value = document.getElementById('address').value;
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

// Add event listener to the form submit button
document.getElementById('paymentForm').addEventListener('submit', payWithPaystack, false);

function payWithPaystack(e) {
  e.preventDefault();

  const totalAmount = calculateTotalPrice();
  const email = document.getElementById('phone').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const Location = document.getElementById('address').value

  let handler = PaystackPop.setup({
    key: 'sk_test_4ebfd45c70eb9ab5b1d152be78ba6277fa6ed315', // Replace with your public key
    email: email,
    amount: totalAmount * 100,
    currency: 'NGN',
    metadata: {
      custom_fields: [
        {
          display_name: 'Cart Item',
          variable_name: 'Cart Item',
          value: cartItems.map(item => item.name).join(','),
        },
        {
          display_name: 'First Name',
          variable_name: 'First Name',
          value: firstName,
        },
        {
          display_name: 'Last Name',
          variable_name: 'Last Name',
          value: lastName,
        },
        {
          display_name: 'Address',
          variable_name: 'Address',
          value: Location,
        },
      ],
    },
    
    onClose: function () {
      alert('Window closed.');
    },
    callback: function (response) {
      let message = 'Payment complete! Reference: ' + response.reference;
      alert(message);
    },
  });

  handler.openIframe();
}
