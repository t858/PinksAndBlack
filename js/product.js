// Add a click event listener to each button
const addToCartBtns = document.querySelectorAll('.add-cart');

addToCartBtns.forEach(function (addToCartBtn) {
  addToCartBtn.addEventListener('click', function (event) {
    event.preventDefault();

    // Get the product details
    const parent = this.closest('.product__item');
    const productName = parent.querySelector('.product__item__text h6').textContent;
    const productPrice = parseFloat(parent.querySelector('.product__item__text h5').textContent.replace('#', '').replace(',', ''));

    // Check if the product already exists in the local storage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let productIndex = cartItems.findIndex(item => item.name === productName && item.price === productPrice);

    // If the product exists in the storage, update its quantity
    if (productIndex >= 0) {
      cartItems[productIndex].quantity++;
    } else {
      // Otherwise, add the product to the storage
      const product = {
        name: productName,
        price: productPrice,
        quantity: 1
      };
      cartItems.push(product);
    }

    // Update the storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Redirect the user to the cart page
    window.location.href = "./shopping-cart.html";
  });
});