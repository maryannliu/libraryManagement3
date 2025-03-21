import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../axiosConfig';

const BookList = ({ books, setBooks, setEditingBook }) => {
  const { user } = useAuth();

  const handleDelete = async (bookId) => {
    try {
      await axiosInstance.delete(`/api/books/${bookId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (error) {
      alert('Failed to delete book.');
    }
  };

  return (
    <div>
      {books.map((book) => (
        <div key={book._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold text-xl mb-2">{book.title}</h2>
          <p className="flex items-center gap-2">
            <strong>Book ID:</strong> <span className="font-mono text-sm">{book._id}</span>
            <button onClick={() => {navigator.clipboard.writeText(book._id);alert('Book ID copied to clipboard!');}}className="text-sm text-blue-600 underline hover:text-blue-800">
              Copy
            </button>
          </p>

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
      ))}
    </div>
  );
};

export default BookList;
