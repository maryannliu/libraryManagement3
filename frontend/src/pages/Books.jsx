import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

import BookForm from '../components/books/BookForm';
import BookList from '../components/books/BookList';

const Books = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]); // always starts as an array
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(true); // for loading state

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axiosInstance.get('api/books', {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        console.log('Books API response:', res.data);

        setBooks(Array.isArray(res.data) ? res.data : []); // defensive assignment
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks([]);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [user.token]);

  // Show form if there are no books
  useEffect(() => {
    if (Array.isArray(books) && books.length === 0) {
      setEditingBook({}); // open the create form
    }
  }, [books]);

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
