// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would make a request to your backend to register the user
    // For now, let's assume the registration is successful
    const registrationSuccessful = true;

    if (registrationSuccessful) {
      // Redirect back to login page
      navigate('/login'); // Use navigate instead of history.push
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'Arial, sans-serif' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#007bff' }}>Register</h2>
        <div style={{ marginBottom: '20px' }}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" style={{ width: '100%', padding: '8px', borderRadius: '8px', marginBottom: '10px' }} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ width: '100%', padding: '8px', borderRadius: '8px', marginBottom: '10px' }} />
          <button type="submit" style={{ width: '100%', padding: '8px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
