const db = require('../db');

exports.getBooks = async (req, res) => {
  try {
    const [books] = await db.execute('SELECT * FROM books');
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

exports.addBook = async (req, res) => {
  const { bookName, isReturned } = req.body;
  try {
    const [result] = await db.execute(
      `INSERT INTO books (bookName, isReturned, takenOn, returnBy)
       VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 1 MINUTE))`,
      [bookName, isReturned || false]
    );
    
    const [newBook] = await db.execute('SELECT * FROM books WHERE id = ?', [result.insertId]);
    res.status(201).json(newBook[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add book' });
  }
};

exports.updateBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const returnedOn = new Date();
    await db.execute(
      'UPDATE books SET isReturned = ?, returnedOn = ? WHERE id = ?',
      [true, returnedOn, bookId]
    );

    const [updatedBook] = await db.execute('SELECT * FROM books WHERE id = ?', [bookId]);
    res.status(200).json(updatedBook[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update book' });
  }
};
