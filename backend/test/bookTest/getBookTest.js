const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const { expect } = chai;

const Book = require('../../models/Books');
const { getBooks } = require('../../controllers/bookController');

describe('getBooks Function Test', () => {
  afterEach(() => sinon.restore());

  it('should return all books', async () => {
    const mockBooks = [
      { title: "Book 1", author: "Author A" },
      { title: "Book 2", author: "Author B" }
    ];

    const findStub = sinon.stub(Book, 'find').resolves(mockBooks);

    const req = {};
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    await getBooks(req, res);

    expect(findStub.calledOnce).to.be.true;
    expect(res.json.calledWith(mockBooks)).to.be.true;
    expect(res.status.called).to.be.false;
  });

  it('should return 500 on error', async () => {
    sinon.stub(Book, 'find').throws(new Error('DB Error'));

    const req = {};
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    await getBooks(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ error: 'DB Error' })).to.be.true;
  });
});
