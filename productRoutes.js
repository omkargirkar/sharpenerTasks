const express = require('express');
const router = express.Router();

// Fetch all products
router.get('/', (req, res) => {
    res.send("Fetching all products");
});

// Add a new product
router.post('/', (req, res) => {
    res.send("Adding a new product");
});

// Fetch a product by ID
router.get('/:id', (req, res) => {
    res.send(`Fetching product with ID: ${req.params.id}`);
});

module.exports = router;