const crypto = require('crypto');
const request = require('request');
const WebSocket = require('websocket')
const express = require('express')
// Replace with your actual public key
const publickey = "OPAYPUB*************54133";

// Function to calculate the signature
function calculateSignature(publicKey) {
  const prefix = 'Bearer ';
  const signatureData = prefix + publicKey;

  // Generate the SHA-512 hash of the signature data
  const signature = crypto.createHash('sha512').update(signatureData).digest('hex');

  return signature;
}

// Function to generate a unique reference
function generateReference() {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const reference = `${timestamp}_${randomString}`;
  return reference;
}

class NiCallBackAutoController {
  constructor() {
    this.secretKey = 'OPAYPRV**************************98453';
    this.merchantId = '256621051120756';
  }

  test(request) {
    const input = request.body;
    if (!input || !input.payload) {
      return 'Parameter error';
    }
    const { reference, transactionId, status, amount, currency, refunded, timestamp, token } = input.payload;

    const authJson = JSON.stringify({ Amount: amount, Currency: currency, Reference: reference, Refunded: refunded ? "t" : "f", Status: status, Timestamp: timestamp, Token: token, TransactionID: transactionId });
    const sha512 = this.generateSha512(authJson);

    if (sha512 !== input.sha512) {
      return 'Invalid signature'; // Signature verification failed
    }

    // Continue processing the callback

    return 'Callback processed successfully';
  }

  generateSha512(payload) {
    const secretKey = this.secretKey;
    const hmac = crypto.createHmac('sha3-512', secretKey);
    hmac.update(payload);
    return hmac.digest('hex');
  }
}

const controller = new NiCallBackAutoController();

// Handle the request from the frontend JavaScript
app.post('/submit-form', (req, res) => {
  const { firstName, lastName, email, address, phoneNumber, productNames, totalAmount } = req.body;

  // Generate a unique reference
  const reference = generateReference();

  // Generate the dynamic values
  const timestamp = new Date().toISOString();
  const token = Math.floor(Math.random() * 1000000000000000000000).toString();
  const transactionId = token;
  const updated_at = new Date().toISOString();

  // Generate the signature
  const signature = calculateSignature(publickey);

  // Prepare the form data
  const formData = {
    amount: {
      currency: 'NGN',
      total: totalAmount
    },
    callbackUrl: "https://your-call-back-url",
    cancelUrl: "https://your-cancel-url",
    country: "NG",
    expireAt: 300,
    sn: "PE462xxxxxxxx",
    payMethod: "BankCard",
    product: {
      description: "description",
      name: productNames
    },
    reference: reference,
    returnUrl: "https://your-return-url",
    userInfo: {
      userEmail: email,
      userId: "userid001",
      userMobile: phoneNumber,
      userName: `${firstName} ${lastName}`
    },
    timestamp: timestamp,
    token: token,
    transactionId: transactionId,
    updated_at: updated_at
  };

  request({
    url: 'https://testapi.opaycheckout.com/api/v1/international/cashier/create',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${publickey}`,
      'MerchantId': '256621051120756',
      'Signature': signature
    },
    json: true,
    body: formData
  }, function (error, response, body) {
    console.log('body: ');
    console.log(body);
    // Handle the response from the API
    // ...
  });
});

const callbackRequest = {
  body: {
    payload: {
      amount: "49160",
      channel: "Web",
      country: "NG",
      currency: "NGN",
      displayedFailure: "",
      fee: "737",
      feeCurrency: "NGN",
      instrumentType: "BankCard",
      reference: "10023",
      refunded: false,
      status: "SUCCESS",
      timestamp: "2022-05-07T06:20:46Z",
      token: "220507145660712931829",
      transactionId: "220507145660712931829",
      updated_at: "2022-05-07T07:20:46Z"
    },
    sha512: "", // Leave this empty to generate the signature
    type: "transaction-status"
  }
};

// Generate the signature
callbackRequest.body.sha512 = controller.generateSha512(JSON.stringify(callbackRequest.body.payload));

const result = controller.test(callbackRequest);
console.log(result);
