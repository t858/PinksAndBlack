    var alanBtnInstance = alanBtn({
    key: "2f02e30932fd7f3f0c31eab7e16dd8522e956eca572e1d8b807a3e2338fdd0dc/stage",
    onCommand: function (commandData) {
      console.log("Received command data from Alan:", commandData);
  
      if (commandData.command === "order" || commandData.command === "neworder") {
        // Extract product data from the received value
        console.log("Start");
        const productData = extractProductData(commandData.value);
        console.log("Product data:", productData);
  
        // Send the product data to the checkout page
        window.localStorage.setItem("productData", JSON.stringify(productData));
      }
  
      if (commandData.command === "redirect") {
        const checkout = 'file:///C:/Users/drake/Desktop/PinkAndBlack/PinkAndBlack/redirect.html';
        window.open(checkout); // Open the checkout page in a new tab or window
        console.log("Redirecting to checkout page...");
      }
    },
    rootEl: document.getElementById("alan-btn"),
  });
  
  