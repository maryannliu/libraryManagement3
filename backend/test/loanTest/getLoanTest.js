const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;

const Loan = require('../../models/Loan');
const { getLoans } = require('../../controllers/loanController');

describe('getLoans Function Test', () => {
  afterEach(() => sinon.restore());

  it('should return all loans with populated book and member info', async () => {
    const loans = [
      {
        _id: 'loan1',
        bookId: { _id: 'book1', title: 'Book A' },
        memberId: { _id: 'member1', fullName: 'John Doe' }
      }
    ];

    const populateStub = sinon.stub().resolves(loans);
    const findStub = sinon.stub(Loan, 'find').returns({ populate: () => ({ populate: populateStub }) });

    const req = {};
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    await getLoans(req, res);

    expect(res.json.calledWith(loans)).to.be.true;
  });

  it('should return 500 on error', async () => {
    sinon.stub(Loan, 'find').throws(new Error('DB Error'));

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await getLoans(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ error: 'DB Error' })).to.be.true;
  });
});
