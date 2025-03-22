const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const { expect } = chai;

const Book = require('../../models/Books');
const { updateBook } = require('../../controllers/bookController');

describe('updateBook Function Test', () => {
  afterEach(() => sinon.restore());

  it('should update a book successfully', async () => {
    const updatedBook = { title: "Updated Title" };

    const findByIdAndUpdateStub = sinon
      .stub(Book, 'findByIdAndUpdate')
      .resolves(updatedBook);

    const req = {
      params: { id: '123' },
      body: updatedBook
    };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    await updateBook(req, res);

    expect(findByIdAndUpdateStub.calledOnceWith('123', updatedBook, { new: true })).to.be.true;
    expect(res.json.calledWith(updatedBook)).to.be.true;
  });

  it('should return 500 on error', async () => {
    sinon.stub(Book, 'findByIdAndUpdate').throws(new Error('DB Error'));

    const req = { params: { id: '123' }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await updateBook(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ error: 'DB Error' })).to.be.true;
  });
});
