const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  loanDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
  status: { type: String, enum: ['Borrowed', 'Returned', 'Overdue'], default: 'Borrowed' }
});

module.exports = mongoose.model('Loan', LoanSchema);

