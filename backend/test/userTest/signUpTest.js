const chai = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const { expect } = chai;

const User = require('../../models/User');
const { registerUser } = require('../../controllers/authController');

describe('User Signup Test', () => {
  afterEach(() => sinon.restore());

  it('should register a new user', async () => {
    const req = {
      body: { name: 'Alice', email: 'alice@example.com', password: '123456' }
    };

    sinon.stub(User, 'findOne').resolves(null); // no existing user
    sinon.stub(User, 'create').resolves({
      id: 'user-id-1',
      name: 'Alice',
      email: 'alice@example.com'
    });
    sinon.stub(jwt, 'sign').returns('fake-token');

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await registerUser(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWithMatch({ email: 'alice@example.com', token: 'fake-token' })).to.be.true;
  });

  it('should reject if user already exists', async () => {
    sinon.stub(User, 'findOne').resolves({ email: 'alice@example.com' });

    const req = { body: { email: 'alice@example.com' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await registerUser(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'User already exists' })).to.be.true;
  });
});
