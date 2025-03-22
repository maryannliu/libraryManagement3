const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const { expect } = chai;

const Member = require('../../models/Member');
const { addMember } = require('../../controllers/memberController');

describe('addMember Function Test', () => {
  afterEach(() => sinon.restore());

  it('should add a new member successfully', async () => {
    const req = {
      body: {
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        phone: '1234567890',
        address: '123 Main St'
      }
    };

    const saveStub = sinon.stub(Member.prototype, 'save').resolves({
      ...req.body,
      _id: new mongoose.Types.ObjectId(),
      active: true,
      memberSince: new Date()
    });

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await addMember(req, res);

    expect(saveStub.calledOnce).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
  });

  it('should return 500 if save fails', async () => {
    sinon.stub(Member.prototype, 'save').throws(new Error('DB Error'));

    const req = { body: { fullName: 'Fail Case', email: 'fail@example.com' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await addMember(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ error: 'DB Error' })).to.be.true;
  });
});
