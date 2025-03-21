const express = require('express');
const { getLoans, addLoan, updateLoan, deleteLoan } = require('../controllers/loanController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getLoans);
router.post('/', protect, addLoan);
router.put('/:id', protect, updateLoan);
router.delete('/:id', protect, deleteLoan);

module.exports = router;
