const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;

const Loan = require('../../models/Loan');
const { deleteLoan } = require('../../controllers/loanController');

describe('deleteLoan Function Test', () => {
  afterEach(() => sinon.restore());

  it('should delete a loan successfully', async () => {
    const deleteStub = sinon.stub(Loan, 'findByIdAndDelete').resolves({});

    const req = { params: { id: '123' } };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    await deleteLoan(req, res);

    expect(deleteStub.calledOnceWith('123')).to.be.true;
    expect(res.json.calledWith({ message: 'Loan deleted successfully.' })).to.be.true;
  });

  it('should return 500 on error', async () => {
    sinon.stub(Loan, 'findByIdAndDelete').throws(new Error('DB Error'));

    const req = { params: { id: '123' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await deleteLoan(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ error: 'DB Error' })).to.be.true;
  });
});
