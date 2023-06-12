const paymentForm = document.querySelector('#paymentForm');
paymentForm.addEventListener('submit', payWithFlutterwave);

function payWithFlutterwave(e) {
  e.preventDefault();
  const firstName = document.querySelector('#firstName').value;
  const lastName = document.querySelector('#lastName').value;
  const country = document.querySelector('#country').value;
  const address = document.querySelector('#address').value;
  const townCity = document.querySelector('#towncity').value;
  const state = document.querySelector('#state').value;
  const postcode = document.querySelector('#postcode').value;
  const phone = document.querySelector('#phone').value;
  const email = document.querySelector('#email').value;
  const totalPrice = document.querySelector('#totalPrice').textContent;
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const amount = totalPrice;

  const data = {
    firstName,
    lastName,
    country,
    address,
    townCity,
    state,
    postcode,
    phone,
    email,
    amount,
    cartItems
  };

  fetch('http://localhost:3000/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    if (data.link) {
      window.location = data.link;
    } else {
      alert('Payment failed. Please try again.');
    }
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
}
