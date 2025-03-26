const express = require('express');
const router = express.Router();
const userController=require("../controllers/userController")

// Fetch all users
router.get('/', userController.getAllUsers);

// Add a new user
router.post('/', userController.addUser);

// Fetch a user by ID
router.get('/:id', userController.getUserById);

module.exports = router;