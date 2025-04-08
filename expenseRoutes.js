const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/add-expense', expenseController.addExpense);

router.get('/expenses', expenseController.getAllExpenses);

router.delete('/expense/:id', expenseController.deleteExpense);

module.exports = router;