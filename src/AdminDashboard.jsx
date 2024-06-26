import React, { useState, useEffect } from 'react';
import UserChat from './UserChat';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function AdminDashboard() {
  const [userChats, setUserChats] = useState([]);

  useEffect(() => {
    
    setUserChats([
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
      { id: 3, name: 'User 3' }
    ]);
  }, []);

  const openChat = (userId) => {
    console.log(`Opening chat for user ${userId}`);
  };

  return (
    <div style={{ margin: '20px auto', maxWidth: '800px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#007bff' }}>Admin Dashboard</h1>
      {userChats.map((user) => (
        <div key={user.id} style={{ marginBottom: '20px', border: '1px solid #ccc', borderRadius: '8px', padding: '20px', cursor: 'pointer' }} onClick={() => openChat(user.id)}>
          <h2 style={{ margin: 0 }}>{user.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
