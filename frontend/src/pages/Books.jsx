import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

import BookForm from '../components/books/BookForm';
import BookList from '../components/books/BookList';

const Books = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axiosInstance.get('api/books', {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const data = Array.isArray(res.data) ? res.data : [];
        setBooks(data);

        if (data.length === 0) {
          setEditingBook({}); // Trigger book creation form
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [user.token]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Library Books</h1>

      {loading ? (
        <p className="text-gray-500">Loading books...</p>
      ) : (
        <>
          <BookForm
            books={books}
            setBooks={setBooks}
            editingBook={editingBook}
            setEditingBook={setEditingBook}
          />
          <BookList
            books={books}
            setBooks={setBooks}
            setEditingBook={setEditingBook}
          />
        </>
      )}
    </div>
  );
};

export default Books;
