const express = require('express');
const router = express.Router();
const Borrowing = require('../models/Borrowing');
const Book = require('../models/Book');

// Get all borrowing records
router.get('/', async (req, res) => {
  try {
    const borrowings = await Borrowing.find().populate('book').populate('user');
    res.json(borrowings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Borrow a book
router.post('/', async (req, res) => {
  const borrowing = new Borrowing({
    book: req.body.bookId,
    user: req.body.userId
  });
  try {
    const newBorrowing = await borrowing.save();
    // Mark book as not available
    await Book.findByIdAndUpdate(req.body.bookId, { available: false });
    res.status(201).json(newBorrowing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Return a book
router.put('/:id/return', async (req, res) => {
  try {
    const borrowing = await Borrowing.findByIdAndUpdate(req.params.id, { returned: true, returnDate: new Date() }, { new: true });
    // Mark book as available
    await Book.findByIdAndUpdate(borrowing.book, { available: true });
    res.json(borrowing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;