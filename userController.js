const db = require('../db');

exports.addUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );

    const [newUser] = await db.execute('SELECT * FROM users WHERE id = ?', [result.insertId]);

    res.status(201).json({
      message: 'User signup received and stored successfully',
      user: newUser[0]
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Error: Request failed with status code 403' });
    }
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to store user data' });
  }
};
