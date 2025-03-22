const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;

const User = require('../../models/User');
const { getProfile } = require('../../controllers/authController');

describe('Get User Profile Test', () => {
  afterEach(() => sinon.restore());

  it('should return user profile', async () => {
    sinon.stub(User, 'findById').resolves({
      name: 'Charlie',
      email: 'charlie@example.com',
      university: 'ABC Uni',
      address: '123 Lane'
    });

    const req = { user: { id: 'user-id-3' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await getProfile(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch({ email: 'charlie@example.com', university: 'ABC Uni' })).to.be.true;
  });

  it('should return 404 if user not found', async () => {
    sinon.stub(User, 'findById').resolves(null);

    const req = { user: { id: 'not-found-id' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await getProfile(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'User not found' })).to.be.true;
  });
});
