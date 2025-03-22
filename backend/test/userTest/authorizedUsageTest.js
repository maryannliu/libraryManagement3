const chai = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const { expect } = chai;

const User = require('../../models/User'); 
const { protect } = require('../../middleware/authMiddleware');

describe('protect middleware (authorization)', () => {
  afterEach(() => sinon.restore());

  it('should return 401 if no Authorization header is present', async () => {
    const req = { headers: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    await protect(req, res, next);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'Not authorized, no token' })).to.be.true;
    expect(next.called).to.be.false;
  });

  it('should return 401 if token is invalid', async () => {
    const req = {
      headers: { authorization: 'Bearer invalid.token' }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    const next = sinon.spy();

    sinon.stub(jwt, 'verify').throws(new Error('Invalid token'));

    await protect(req, res, next);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'Not authorized, token failed' })).to.be.true;
    expect(next.called).to.be.false;
  });

  it('should call next and attach user to req if token is valid', async () => {
    const fakeUser = {
      _id: 'abc123',
      name: 'Test User',
      email: 'test@example.com'
    };

    const req = {
      headers: { authorization: 'Bearer valid.token' }
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    const next = sinon.spy();

    
    sinon.stub(jwt, 'verify').returns({ id: fakeUser._id });

    
    sinon.stub(User, 'findById').returns({
      select: sinon.stub().returns(fakeUser)
    });

    await protect(req, res, next);

    expect(req.user).to.deep.equal(fakeUser);
    expect(next.calledOnce).to.be.true;
  });
});
