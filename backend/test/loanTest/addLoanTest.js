const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const { expect } = chai;

const Loan = require('../../models/Loan');
const { addLoan } = require('../../controllers/loanController');

describe('addLoan Function Test', () => {
  afterEach(() => sinon.restore());

  it('should create a new loan successfully', async () => {
    const req = {
      body: {
        bookId: new mongoose.Types.ObjectId(),
        memberId: new mongoose.Types.ObjectId(),
        dueDate: new Date('2025-12-31')
      }
    };

    const saveStub = sinon.stub(Loan.prototype, 'save').resolves({
      ...req.body,
      _id: new mongoose.Types.ObjectId(),
      loanDate: new Date(),
      status: 'Borrowed'
    });

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await addLoan(req, res);

    expect(saveStub.calledOnce).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
  });

  it('should return 500 on error', async () => {
    sinon.stub(Loan.prototype, 'save').throws(new Error('DB Error'));

    const req = {
      body: {
        bookId: new mongoose.Types.ObjectId(),
        memberId: new mongoose.Types.ObjectId(),
        dueDate: new Date()
      }
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await addLoan(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ error: 'DB Error' })).to.be.true;
  });
});
