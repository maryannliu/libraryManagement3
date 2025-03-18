import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LoanList() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axios.get('/api/loans');
        setLoans(res.data);
      } catch (error) {
        console.error('Failed to fetch loans:', error);
      }
    };
    fetchLoans();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/loans/${id}`);
      setLoans(loans.filter(loan => loan._id !== id));
    } catch (error) {
      console.error('Failed to delete loan:', error);
    }
  };

  return (
    <div>
      <h2>Loans List</h2>
      {loans.map(loan => (
        <div key={loan._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <p><strong>Book:</strong> {loan.bookId?.title} by {loan.bookId?.author}</p>
          <p><strong>Member:</strong> {loan.memberId?.fullName} ({loan.memberId?.email})</p>
          <p><strong>Status:</strong> {loan.status}</p>
          <p><strong>Due Date:</strong> {new Date(loan.dueDate).toLocaleDateString()}</p>
          <button
            onClick={() => handleDelete(loan._id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default LoanList;
