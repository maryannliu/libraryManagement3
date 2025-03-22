<div>
  {Array.isArray(books) && books.length > 0 ? (
    books.map((book) => (
      <div key={book._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
        <h2 className="font-bold text-xl mb-2">{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Genre:</strong> {book.genre || 'N/A'}</p>
        <p><strong>Copies Available:</strong> {book.copiesAvailable}</p>
        <p><strong>Total Copies:</strong> {book.totalCopies}</p>
        <p><strong>Published Date:</strong> {book.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Added On:</strong> {new Date(book.createdAt).toLocaleDateString()}</p>
        <div className="mt-3">
          <button
            onClick={() => setEditingBook(book)}
            className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(book._id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500 mt-6">
      No books yet — use the form above to add your first book.
    </p>
  )}
</div>
