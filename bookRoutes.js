const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// GET all books
router.get('/', bookController.getBooks);

// POST a new book
router.post('/', bookController.addBook);

// PUT (mark as returned)
router.put('/:id', bookController.updateBook);

module.exports = router;
