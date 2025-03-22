const chai = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { expect } = chai;

const User = require('../../models/User');
const { loginUser } = require('../../controllers/authController');

describe('User Login Test', () => {
  afterEach(() => sinon.restore());

  it('should login with valid credentials', async () => {
    const req = {
      body: { email: 'bob@example.com', password: 'secret' }
    };

    sinon.stub(User, 'findOne').resolves({
      id: 'user-id-2',
      name: 'Bob',
      email: 'bob@example.com',
      password: 'hashed-pass'
    });
    sinon.stub(bcrypt, 'compare').resolves(true);
    sinon.stub(jwt, 'sign').returns('login-token');

    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    await loginUser(req, res);

    expect(res.json.calledWithMatch({ email: 'bob@example.com', token: 'login-token' })).to.be.true;
  });

  it('should reject invalid password', async () => {
    sinon.stub(User, 'findOne').resolves({ password: 'hashed-pass' });
    sinon.stub(bcrypt, 'compare').resolves(false);

    const req = { body: { email: 'bob@example.com', password: 'wrong' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await loginUser(req, res);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'Invalid email or password' })).to.be.true;
  });
});
