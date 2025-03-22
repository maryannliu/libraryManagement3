const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;

const Member = require('../../models/Member');
const { deleteMember } = require('../../controllers/memberController');

describe('deleteMember Function Test', () => {
  afterEach(() => sinon.restore());

  it('should delete a member successfully', async () => {
    const deleteStub = sinon.stub(Member, 'findByIdAndDelete').resolves({});

    const req = { params: { id: '123' } };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    await deleteMember(req, res);

    expect(deleteStub.calledOnceWith('123')).to.be.true;
    expect(res.json.calledWith({ message: 'Member deleted successfully.' })).to.be.true;
  });

  it('should return 500 on error', async () => {
    sinon.stub(Member, 'findByIdAndDelete').throws(new Error('DB Error'));

    const req = { params: { id: '123' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await deleteMember(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ error: 'DB Error' })).to.be.true;
  });
});
