import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../axiosConfig';

const LoanList = ({ loans, setLoans, setEditingLoan }) => {
  const { user } = useAuth();

  const handleDelete = async (loanId) => {
    try {
      await axiosInstance.delete(`/api/loans/${loanId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setLoans(loans.filter((loan) => loan._id !== loanId));
    } catch (error) {
      alert('Failed to delete loan.');
    }
  };

  return (
    <div>
      {loans.map((loan) => (
        <div key={loan._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold text-xl mb-2">Loan Record</h2>

          {/* ✅ Loan ID with Copy Button */}
          <p className="flex items-center gap-2">
            <strong>Loan ID:</strong>
            <span className="font-mono text-sm">{loan._id}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(loan._id);
                alert('Loan ID copied to clipboard!');
              }}
              className="text-sm text-blue-600 underline hover:text-blue-800"
            >
              Copy
            </button>
          </p>

          {/* ✅ Book and Member Display */}
          <p><strong>Book ID:</strong> {loan.bookId?.title || loan.bookId}</p>
          <p><strong>Member ID:</strong> {loan.memberId?.fullName || loan.memberId}</p>

          {/* ✅ Dates and Status */}
          <p><strong>Loan Date:</strong> {loan.loanDate ? new Date(loan.loanDate).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Due Date:</strong> {loan.dueDate ? new Date(loan.dueDate).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Status:</strong> {loan.status}</p>

          {/* ✅ Actions */}
          <div className="mt-3">
            <button
              onClick={() => setEditingLoan(loan)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(loan._id)}
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

export default LoanList;
