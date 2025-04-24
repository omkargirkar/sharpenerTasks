//expenseController.js

const db = require('../db');

// Create Expense
exports.addExpense = async (req, res) => {
    const { amount, description, category } = req.body;
    const userId = req.user.userId;
    const sql = 'INSERT INTO expenses (amount, description, category, userId) VALUES (?, ?, ?, ?)';
    console.log("Received data:", { amount, description, category, userId });
    try {
        const [result] = await db.query(sql, [amount, description, category, userId]);
        const [newExpense] = await db.execute('SELECT * FROM expenses WHERE id = ?', [result.insertId]);
        res.status(201).json(newExpense[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add expense' });
    }
};

// Get All Expenses
exports.getAllExpenses = async (req, res) => {
    const userId = req.user.userId;
    const sql = 'SELECT * FROM expenses where userId=?';
    try {
        const [rows] = await db.query(sql,[userId]);
        res.json(rows); // Send data as JSON
    } catch (err) {
        console.error('Error fetching expenses:', err);
        res.send('Failed to fetch expenses');
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;
    const sql = 'DELETE FROM expenses WHERE id = ? AND userID=?';
    try {
        const [result] = await db.query(sql, [id,userId]);
        if (result.affectedRows === 0) {
            return res.status(403).json({ error: 'Not authorized to delete this expense' });
        }
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false });
    }
};