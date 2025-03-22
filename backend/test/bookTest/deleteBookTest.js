const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const { expect } = chai;

const Book = require('../../models/Books');
const { deleteBook } = require('../../controllers/bookController');

describe('deleteBook Function Test', () => {
  afterEach(() => sinon.restore());

  it('should delete a book successfully', async () => {
    const deleteStub = sinon.stub(Book, 'findByIdAndDelete').resolves({});

    const req = { params: { id: '123' } };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    await deleteBook(req, res);

    expect(deleteStub.calledOnceWith('123')).to.be.true;
    expect(res.json.calledWith({ message: 'Book deleted successfully.' })).to.be.true;
  });

  it('should return 500 on error', async () => {
    sinon.stub(Book, 'findByIdAndDelete').throws(new Error('DB Error'));

    const req = { params: { id: '123' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await deleteBook(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ error: 'DB Error' })).to.be.true;
  });
});
