//purchaseController.js

const axios = require('axios');
const db = require('../db');
const { Cashfree } = require('cashfree-pg');  // Ensure this is imported correctly

exports.purchasePremium = async (req, res) => {
  const userId = req.user.userId;
  const orderId = `order_${Date.now()}`;
  const orderAmount = 99;
  const orderCurrency = "INR";

  try {
    console.log('Creating order in Cashfree...');

    const response = await axios.post(
      'https://sandbox.cashfree.com/pg/orders',
      {
        order_id: orderId,
        order_amount: orderAmount,
        order_currency: orderCurrency,
        customer_details: {
          customer_id: String(userId),
          customer_email: 'demo@example.com',
          customer_phone: '9876543210'
        },
        order_meta: {
          return_url: `http://localhost:3000/status.html?order_id=${orderId}`,
          cancel_url: `http://localhost:3000/status.html?order_id=${orderId}`
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-client-id': 'TEST430329ae80e0f32e41a393d78b923034',
          'x-client-secret': 'TESTaf195616268bd6202eeb3bf8dc458956e7192a85',
          'x-api-version': '2022-09-01' // Important header
        }
      }
    );

    console.log('Cashfree response received:', response.data);

    const paymentSessionId = response.data.payment_session_id; // ✅ changed here

    if (!paymentSessionId) {
      console.error('Payment Session ID is missing in Cashfree response');
      return res.status(500).json({ error: 'Payment Session ID missing' });
    }

    console.log('Inserting order into database...');
    await db.execute(
      'INSERT INTO orders (order_id, status, user_id) VALUES (?, ?, ?)',
      [orderId, 'PENDING', userId]
    );

    console.log('Order inserted successfully. Sending session id...');
    res.status(200).json({ paymentSessionId }); // ✅ changed here

  } catch (err) {
    console.error('Error caught:');
    if (err.response) {
      console.error("Cashfree error response:");
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
    } else {
      console.error("Error:", err.message);
    }
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.updateStatus = async (req, res) => {
  const { orderId, paymentStatus } = req.body;
  const userId = req.user.userId;

  try {
      // Update the order status first
      await db.execute(
          'UPDATE orders SET status = ? WHERE order_id = ?',
          [paymentStatus, orderId]
      );

      // If payment was successful, make user premium
      if (paymentStatus === 'SUCCESSFUL') {
          await db.execute(
              'UPDATE users SET isPremium = ? WHERE id = ?',
              [true, userId]
          );
      }

      res.status(200).json({ message: 'Order status updated successfully' });
  } catch (err) {
      console.error('Error updating order status:', err);
      res.status(500).json({ error: 'Failed to update order status' });
  }
};

exports.checkPaymentStatus = async (req, res) => {
//   const cashfree = Cashfree({
//     mode: "sandbox"
// });

  const { orderId } = req.params; // Get the orderId from the URL
  const userId = req.user.userId;

  try {
    console.log(`Fetching payment status for Order ID: ${orderId}`); // Log the order ID

    // Fetch payment status from Cashfree
    const response = await Cashfree.PGOrderFetchPayments("2024-01-01", orderId); // "fromDate" can be a fixed date
    console.log("Cashfree Response:", response.data); // Log the full response from Cashfree
    
    const getOrderResponse = response.data;

    let orderStatus;
    if (getOrderResponse.filter(txn => txn.payment_status === "SUCCESS").length > 0) {
      orderStatus = "SUCCESSFUL";
    } else if (getOrderResponse.filter(txn => txn.payment_status === "PENDING").length > 0) {
      orderStatus = "PENDING";
    } else {
      orderStatus = "FAILED";
    }

    console.log(`Order Status: ${orderStatus}`); // Log the final order status
    // Return the order status
    res.status(200).json({ orderStatus });

  } catch (err) {
    if (err.response) {
      console.error("Cashfree error response:");
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
    } else {
      console.error("Error:", err.message);
    }
    res.status(500).json({ error: "Failed to fetch payment status" });
  }
};
