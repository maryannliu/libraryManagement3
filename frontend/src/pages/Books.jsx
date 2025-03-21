import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

import BookForm from '../components/books/BookForm';
import BookList from '../components/books/BookList';

const Books = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axiosInstance.get('api/books', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBooks(res.data);
    };
    fetchBooks();
  }, [user.token]);

  return (
    <div className="container mx-auto p-4">
      <BookForm
        books={books}
        setBooks={setBooks}
        editingBook={editingBook}
        setEditingBook={setEditingBook}
      />
      <BookList books={books} setBooks={setBooks} setEditingBook={setEditingBook} />
    </div>
  );
};

export default Books;
