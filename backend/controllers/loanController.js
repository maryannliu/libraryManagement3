const Loan = require('../models/Loan');

exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find()
      .populate('bookId', 'title author')
      .populate('memberId', 'fullName email');
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLoan = async (req, res) => {
  try {
    const loan = new Loan(req.body);
    await loan.save();
    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLoan = async (req, res) => {
  try {
    const updatedLoan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLoan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLoan = async (req, res) => {
  try {
    await Loan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Loan deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
