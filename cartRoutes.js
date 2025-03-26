const express = require('express');
const router = express.Router();
const cartController=require("../controllers/cartController")

// Fetch cart for a specific user
router.get('/:userId', cartController.getCartForUser);

// Add a product to the user's cart
router.post('/:userId', cartController.addProductToCart);

module.exports = router;