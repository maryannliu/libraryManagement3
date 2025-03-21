import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../axiosConfig';

const LoanForm = ({ loans, setLoans, editingLoan, setEditingLoan }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    bookId: '',
    memberId: '',
    dueDate: '',
  });

  useEffect(() => {
    if (editingLoan) {
      setFormData({
        bookId: editingLoan.bookId?._id || editingLoan.bookId || '',
        memberId: editingLoan.memberId?._id || editingLoan.memberId || '',
        dueDate: editingLoan.dueDate
          ? editingLoan.dueDate.split('T')[0]
          : '',
      });
    } else {
      setFormData({
        bookId: '',
        memberId: '',
        dueDate: '',
      });
    }
  }, [editingLoan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiConfig = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      let response;
      if (editingLoan) {
        response = await axiosInstance.put(
          `/api/loans/${editingLoan._id}`,
          formData,
          apiConfig
        );
        setLoans(loans.map((loan) => (loan._id === response.data._id ? response.data : loan)));
      } else {
        response = await axiosInstance.post('/api/loans', formData, apiConfig);
        setLoans([...loans, response.data]);
      }
      setEditingLoan(null);
      setFormData({ bookId: '', memberId: '', dueDate: '' });
    } catch (error) {
      alert('Failed to save loan.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">
        {editingLoan ? 'Edit Loan' : 'Issue New Loan'}
      </h1>
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
        {editingLoan ? 'Update Loan' : 'Create Loan'}
      </button>
    </form>
  );
};

export default LoanForm;
