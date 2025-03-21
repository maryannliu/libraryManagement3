import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

import MemberForm from '../components/members/MemberForm';
import MemberList from '../components/members/MemberList';

const Members = () => {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await axiosInstance.get('/api/members', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMembers(res.data);
    };
    fetchMembers();
  }, [user.token]);

  return (
    <div className="container mx-auto p-4">
      <MemberForm
        members={members}
        setMembers={setMembers}
        editingMember={editingMember}
        setEditingMember={setEditingMember}
      />
      <MemberList
        members={members}
        setMembers={setMembers}
        setEditingMember={setEditingMember}
      />
    </div>
  );
};

export default Members;
