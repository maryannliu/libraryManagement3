import React, { useState } from 'react';
import axios from 'axios';

const LoanForm = ({ setLoans }) => {
  const [formData, setFormData] = useState({
    bookId: '',
    memberId: '',
    dueDate: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/loans', formData);
      setLoans((prevLoans) => [...prevLoans, res.data]);  // Update the list
      setFormData({ bookId: '', memberId: '', dueDate: '' }); // Reset form
      alert('Loan issued successfully');
    } catch (error) {
      console.error('Failed to issue loan:', error);
      alert('Failed to issue loan');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">Issue a Loan</h1>
      <input
        type="text"
        placeholder="Book ID"
        value={formData.bookId}
        onChange={(e) => setFormData({ ...formData, bookId: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Member ID"
        value={formData.memberId}
        onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="date"
        placeholder="Due Date"
        value={formData.dueDate}
        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        Issue Loan
      </button>
    </form>
  );
};

export default LoanForm;
