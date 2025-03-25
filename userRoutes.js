const express = require('express');
const router = express.Router();

// Fetch all users
router.get('/', (req, res) => {
    res.send("Fetching all users");
});

// Add a new user
router.post('/', (req, res) => {
    res.send("Adding a new user");
});

// Fetch a user by ID
router.get('/:id', (req, res) => {
    res.send(`Fetching user with ID: ${req.params.id}`);
});

module.exports = router;