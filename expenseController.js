const db = require('../db');

// Create Expense
exports.addExpense = async (req, res) => {
    const { amount, description, category } = req.body;
    const sql = 'INSERT INTO expenses (amount, description, category) VALUES (?, ?, ?)';
    try {
        const [result] = await db.query(sql, [amount, description, category]);
        console.log('Expense added:', result);
        res.redirect('/');
    } catch (err) {
        console.error('Error adding expense:', err);
        res.send('Something went wrong!');
    }
};

// Get All Expenses
exports.getAllExpenses = async (req, res) => {
    const sql = 'SELECT * FROM expenses';
    try {
        const [rows] = await db.query(sql);
        res.json(rows); // Send data as JSON
    } catch (err) {
        console.error('Error fetching expenses:', err);
        res.send('Failed to fetch expenses');
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM expenses WHERE id = ?';
    try {
        const [result] = await db.query(sql, [id]);
        console.log('Expense deleted:', result);
        res.json({ success: true });
    } catch (err) {
        console.error('Error deleting expense:', err);
        res.status(500).json({ success: false });
    }
};