import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../axiosConfig';

const BookForm = ({ books, setBooks, editingBook, setEditingBook }) => {
  const { user } = useAuth();

  const isEditing = editingBook && editingBook._id;

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    copiesAvailable: 1,
    totalCopies: 1,
    publishedDate: '',
  });

  useEffect(() => {
    if (isEditing) {
      setFormData({
        title: editingBook.title,
        author: editingBook.author,
        isbn: editingBook.isbn,
        genre: editingBook.genre || '',
        copiesAvailable: editingBook.copiesAvailable,
        totalCopies: editingBook.totalCopies,
        publishedDate: editingBook.publishedDate
          ? editingBook.publishedDate.split('T')[0]
          : '',
      });
    } else {
      setFormData({
        title: '',
        author: '',
        isbn: '',
        genre: '',
        copiesAvailable: 1,
        totalCopies: 1,
        publishedDate: '',
      });
    }
  }, [editingBook]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiConfig = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      let response;
      if (isEditing) {
        response = await axiosInstance.put(
          `/api/books/${editingBook._id}`,
          formData,
          apiConfig
        );
        setBooks(
          books.map((book) =>
            book._id === response.data._id ? response.data : book
          )
        );
      } else {
        response = await axiosInstance.post('/api/books', formData, apiConfig);
        setBooks([...books, response.data]);
      }

      setEditingBook(null);
      setFormData({
        title: '',
        author: '',
        isbn: '',
        genre: '',
        copiesAvailable: 1,
        totalCopies: 1,
        publishedDate: '',
      });
    } catch (error) {
      alert('Failed to save book.');
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow-md rounded mb-6"
    >
      <h1 className="text-2xl font-bold mb-4">
        {isEditing ? 'Edit Book' : 'Add New Book'}
      </h1>

      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <input
        type="text"
        placeholder="Author"
        value={formData.author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <input
        type="text"
        placeholder="ISBN"
        value={formData.isbn}
        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <input
        type="text"
        placeholder="Genre"
        value={formData.genre}
        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="number"
        placeholder="Copies Available"
        value={formData.copiesAvailable}
        onChange={(e) =>
          setFormData({
            ...formData,
            copiesAvailable: parseInt(e.target.value),
          })
        }
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <input
        type="number"
        placeholder="Total Copies"
        value={formData.totalCopies}
        onChange={(e) =>
          setFormData({
            ...formData,
            totalCopies: parseInt(e.target.value),
          })
        }
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <input
        type="date"
        placeholder="Published Date"
        value={formData.publishedDate}
        onChange={(e) =>
          setFormData({ ...formData, publishedDate: e.target.value })
        }
        className="w-full mb-4 p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        {isEditing ? 'Update Book' : 'Create Book'}
      </button>

      {isEditing && (
        <button
          type="button"
          onClick={() => {
            setEditingBook(null);
            setFormData({
              title: '',
              author: '',
              isbn: '',
              genre: '',
              copiesAvailable: 1,
              totalCopies: 1,
              publishedDate: '',
            });
          }}
          className="w-full mt-2 bg-gray-500 text-white p-2 rounded"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default BookForm;
