const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;

const Member = require('../../models/Member');
const { getMembers } = require('../../controllers/memberController');

describe('getMembers Function Test', () => {
  afterEach(() => sinon.restore());

  it('should return all members', async () => {
    const mockMembers = [
      { fullName: 'Jane Doe', email: 'jane@example.com' },
      { fullName: 'John Smith', email: 'john@example.com' }
    ];

    const findStub = sinon.stub(Member, 'find').resolves(mockMembers);

    const req = {};
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    await getMembers(req, res);

    expect(findStub.calledOnce).to.be.true;
    expect(res.json.calledWith(mockMembers)).to.be.true;
  });

  it('should return 500 on error', async () => {
    sinon.stub(Member, 'find').throws(new Error('DB Error'));

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await getMembers(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ error: 'DB Error' })).to.be.true;
  });
});
