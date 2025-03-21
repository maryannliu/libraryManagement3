const Loan = require('../models/Loan');

// Get all loans
exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find()
      .populate('bookId', 'title')        // Optionally include book info
      .populate('memberId', 'fullName');  // Optionally include member info
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add new loan
exports.addLoan = async (req, res) => {
  try {
    const loan = new Loan(req.body);
    await loan.save();
    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a loan
exports.updateLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a loan
exports.deleteLoan = async (req, res) => {
  try {
    await Loan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Loan deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
