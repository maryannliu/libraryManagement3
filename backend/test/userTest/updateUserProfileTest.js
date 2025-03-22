const chai = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const { expect } = chai;

const User = require('../../models/User');
const { updateUserProfile } = require('../../controllers/authController');

describe('Update User Profile Test', () => {
  afterEach(() => sinon.restore());

  it('should update user profile', async () => {
    const saveStub = sinon.stub().resolves({
      id: 'user-id-4',
      name: 'Updated User',
      email: 'updated@example.com',
      university: 'XYZ University',
      address: '456 Street'
    });

    sinon.stub(User, 'findById').resolves({
      name: 'Old User',
      email: 'old@example.com',
      university: '',
      address: '',
      save: saveStub
    });

    sinon.stub(jwt, 'sign').returns('new-token');

    const req = {
      user: { id: 'user-id-4' },
      body: {
        name: 'Updated User',
        email: 'updated@example.com',
        university: 'XYZ University',
        address: '456 Street'
      }
    };

    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    await updateUserProfile(req, res);

    expect(res.json.calledWithMatch({ name: 'Updated User', token: 'new-token' })).to.be.true;
  });

  it('should return 404 if user not found', async () => {
    sinon.stub(User, 'findById').resolves(null);

    const req = { user: { id: 'not-found-id' }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await updateUserProfile(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'User not found' })).to.be.true;
  });
});
