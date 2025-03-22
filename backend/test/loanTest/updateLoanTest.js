const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;

const Loan = require('../../models/Loan');
const { updateLoan } = require('../../controllers/loanController');

describe('updateLoan Function Test', () => {
  afterEach(() => sinon.restore());

  it('should update loan successfully', async () => {
    const updatedLoan = {
      status: 'Returned',
      returnDate: new Date()
    };

    const findByIdAndUpdateStub = sinon.stub(Loan, 'findByIdAndUpdate').resolves(updatedLoan);

    const req = {
      params: { id: '123' },
      body: updatedLoan
    };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    await updateLoan(req, res);

    expect(findByIdAndUpdateStub.calledOnceWith('123', updatedLoan, { new: true })).to.be.true;
    expect(res.json.calledWith(updatedLoan)).to.be.true;
  });

  it('should return 500 on error', async () => {
    sinon.stub(Loan, 'findByIdAndUpdate').throws(new Error('DB Error'));

    const req = { params: { id: '123' }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await updateLoan(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ error: 'DB Error' })).to.be.true;
  });
});

