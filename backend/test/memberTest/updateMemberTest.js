const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;

const Member = require('../../models/Member');
const { updateMember } = require('../../controllers/memberController');

describe('updateMember Function Test', () => {
  afterEach(() => sinon.restore());

  it('should update a member successfully', async () => {
    const updatedMember = {
      fullName: 'Updated Name',
      email: 'updated@example.com'
    };

    const findStub = sinon
      .stub(Member, 'findByIdAndUpdate')
      .resolves(updatedMember);

    const req = {
      params: { id: '123' },
      body: updatedMember
    };

    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    await updateMember(req, res);

    expect(findStub.calledOnceWith('123', updatedMember, { new: true })).to.be.true;
    expect(res.json.calledWith(updatedMember)).to.be.true;
  });

  it('should return 500 on error', async () => {
    sinon.stub(Member, 'findByIdAndUpdate').throws(new Error('DB Error'));

    const req = { params: { id: '123' }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await updateMember(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ error: 'DB Error' })).to.be.true;
  });
});
