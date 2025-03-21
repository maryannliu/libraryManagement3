import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../axiosConfig';

const MemberList = ({ members, setMembers, setEditingMember }) => {
  const { user } = useAuth();

  // ✅ Function to handle member deletion
  const handleDelete = async (memberId) => {
    try {
      await axiosInstance.delete(`/api/members/${memberId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMembers(members.filter((member) => member._id !== memberId));
    } catch (error) {
      alert('Failed to delete member.');
    }
  };

  // ✅ NEW FUNCTION: Toggle active status (Activate / Deactivate)
  const handleToggleStatus = async (member) => {
    try {
      const updatedMember = {
        ...member,
        active: !member.active,
      };
      const res = await axiosInstance.put(`/api/members/${member._id}`, updatedMember, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMembers(members.map((m) => (m._id === member._id ? res.data : m)));
    } catch (error) {
      alert('Failed to update member status.');
    }
  };

  return (
    <div>
      {members.map((member) => (
        <div key={member._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          

          <h2 className="font-bold text-xl mb-2">{member.fullName}</h2>
          <p className="flex items-center gap-2">

        {/* member ID and copy button */}
          <strong>Member ID:</strong> <span className="font-mono text-sm">{member._id}</span>
          <button onClick={() => {navigator.clipboard.writeText(member._id); alert('Member ID copied to clipboard!');}}className="text-sm text-blue-600 underline hover:text-blue-800">
            Copy
          </button>
</p>

          <p><strong>Email:</strong> {member.email}</p>
          <p><strong>Phone:</strong> {member.phone || 'N/A'}</p>
          <p><strong>Address:</strong> {member.address || 'N/A'}</p>
          <p><strong>Member Since:</strong> {member.memberSince ? new Date(member.memberSince).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Status:</strong> {member.active ? 'Active' : 'Inactive'}</p>

          <div className="mt-3">
            {/* ✅ Edit Button */}
            <button
              onClick={() => setEditingMember(member)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>

            {/* ✅ Delete Button */}
            <button
              onClick={() => handleDelete(member._id)}
              className="mr-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>

            {/* ✅ NEW: Toggle Status Button */}
            <button
              onClick={() => handleToggleStatus(member)}
              className={`${
                member.active ? 'bg-gray-600' : 'bg-green-600'
              } text-white px-4 py-2 rounded`}
            >
              {member.active ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberList;
