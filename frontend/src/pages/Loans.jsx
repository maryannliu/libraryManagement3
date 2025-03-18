import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

import LoanForm from '../components/loans/LoanForm';
import LoanList from '../components/loans/LoanList';

const Loans = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axiosInstance.get('/api/loans', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setLoans(res.data);
      } catch (error) {
        console.error('Failed to fetch loans:', error);
      }
    };
    fetchLoans();
  }, [user.token]);

  return (
    <div className="container mx-auto p-4">
      <LoanForm setLoans={setLoans} />
      <LoanList loans={loans} setLoans={setLoans} />
    </div>
  );
};

export default Loans;
