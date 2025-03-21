import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

import LoanForm from '../components/loans/LoanForm';
import LoanList from '../components/loans/LoanList';

const Loans = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);
  const [editingLoan, setEditingLoan] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axiosInstance.get('/api/loans', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setLoans(res.data);
      } catch (error) {
        alert('Failed to fetch loans.');
      }
    };

    fetchLoans();
  }, [user.token]);

  return (
    <div className="container mx-auto p-4">
      <LoanForm
        loans={loans}
        setLoans={setLoans}
        editingLoan={editingLoan}
        setEditingLoan={setEditingLoan}
      />
      <LoanList
        loans={loans}
        setLoans={setLoans}
        setEditingLoan={setEditingLoan}
      />
    </div>
  );
};

export default Loans;
ß