const express = require('express');
const router = express.Router();

// Fetch cart for a specific user
router.get('/:userId', (req, res) => {
    res.send(`Fetching cart for user with ID: ${req.params.userId}`);
});

// Add a product to the user's cart
router.post('/:userId', (req, res) => {
    res.send(`Adding product to cart for user with ID: ${req.params.userId}`);
});

module.exports = router;