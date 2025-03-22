const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;

const Member = require('../../models/Member');
const { updateMember } = require('../../controllers/memberController');

describe('Toggle Member Status Test', () => {
  afterEach(() => sinon.restore());

  it('should toggle member active status from true to false', async () => {
    const originalMember = {
      _id: '123',
      fullName: 'Alice Smith',
      email: 'alice@example.com',
      active: true
    };

    const updatedData = {
      ...originalMember,
      active: false // 👈 toggled status
    };

    const findStub = sinon.stub(Member, 'findByIdAndUpdate').resolves(updatedData);

    const req = {
      params: { id: originalMember._id },
      body: updatedData
    };

    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    await updateMember(req, res);

    expect(findStub.calledOnceWith(originalMember._id, updatedData, { new: true })).to.be.true;
    expect(res.json.calledWith(updatedData)).to.be.true;
  });

  it('should return 500 if toggle fails', async () => {
    sinon.stub(Member, 'findByIdAndUpdate').throws(new Error('Toggle error'));

    const req = {
      params: { id: '123' },
      body: { active: false }
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await updateMember(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ error: 'Toggle error' })).to.be.true;
  });
});
