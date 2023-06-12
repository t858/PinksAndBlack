
// Get the cart items from the local storage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to display the cart items in the table
function displayCartItems() {
  const tableBody = document.querySelector('.cart__table tbody');
  tableBody.innerHTML = '';

  cartItems.forEach(function(item, index) {
    const tr = document.createElement('tr');
    
    const productName = item.name || '';
    const productPrice = item.price || 0;
    const productQuantity = item.quantity || 0;
    
    const totalPrice = (productPrice * productQuantity).toFixed(2);

    tr.innerHTML = `
      <td class="product__cart__item">
        <div class="product__cart__item__text">
          <h6>${productName}</h6>
          <h5>#${productPrice.toFixed(2)}</h5>
        </div>
      </td>
      <td class="quantity__item">
        <div class="quantity">
          <div class="pro-qty-2">
            <input type="text" value="${productQuantity}">
          </div>
        </div>
      </td>
      <td class="cart__price"># ${totalPrice}</td>
      <td class="cart__close"><i class="fa fa-close" data-index="${index}"></i></td>
    `;

    tableBody.appendChild(tr);
  });
}

// Display the cart items on page load
displayCartItems();

// Function to remove an item from the cart
function removeCartItem(index) {
  cartItems.splice(index, 1);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  displayCartItems();
  // Add event listener again after removing item
  addCloseButtonListeners();
}

// Function to add event listeners to the close buttons
function addCloseButtonListeners() {
  const closeBtns = document.querySelectorAll('.cart__close i');
  closeBtns.forEach(function (closeBtn) {
    closeBtn.addEventListener('click', function (event) {
      const index = event.target.dataset.index;
      removeCartItem(index);
    });
  });
}

// Add event listeners to the close buttons
addCloseButtonListeners();
