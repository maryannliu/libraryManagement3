const express = require('express');
const router = express.Router();
const { getBooks, updateBook, deleteBook, addBook } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getBooks);
router.post('/', protect, addBook);
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);

module.exports = router;
