//expenseRoutes.js

const authenticate = require('../middleware/authMiddleware');

const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/add', authenticate, expenseController.addExpense);

router.get('/get', authenticate, expenseController.getAllExpenses);

router.delete('/delete/:id', authenticate, expenseController.deleteExpense);

module.exports = router;