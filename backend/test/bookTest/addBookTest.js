const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const { expect } = chai;

const Book = require('../../models/Books'); 
const { addBook } = require('../../controllers/bookController');

describe('addBook Function Test', () => {
  afterEach(() => {
    sinon.restore(); // Clean up all stubs
  });

  it('should create a new book successfully', async () => {
    const req = {
      body: {
        title: "Atomic Habits",
        author: "James Clear",
        isbn: "9780735211292",
        genre: "Self-help",
        totalCopies: 5
      }
    };

    const saveStub = sinon.stub().resolves({ ...req.body, _id: new mongoose.Types.ObjectId() });
    const bookStub = sinon.stub(Book.prototype, 'save').callsFake(saveStub);

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await addBook(req, res);

    expect(bookStub.calledOnce).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
  });

  it('should return 500 if save throws an error', async () => {
    const req = {
      body: {
        title: "Error Book",
        author: "Oops",
        isbn: "0000",
        totalCopies: 1
      }
    };

    const saveStub = sinon.stub(Book.prototype, 'save').throws(new Error('DB Error'));

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await addBook(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ error: 'DB Error' })).to.be.true;
  });
});
