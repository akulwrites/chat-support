// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would make a request to your backend to check if the user exists
    // For now, let's assume the user exists
    const userExists = true;

    if (userExists) {
      // Redirect to home page or user dashboard
      navigate('/user');
    } else {
      // Redirect to register page
      navigate('/register');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '200vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#007bff' }}>Login</h2>
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" style={{ width: '95%', padding: '8px', borderRadius: '8px', marginBottom: '10px' }} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ width: '95%', padding: '8px', borderRadius: '8px', marginBottom: '10px' }} />
          <button type="submit" style={{ width: '80%', padding: '8px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Login</button>
        </div>
        <div style={{ textAlign: 'center', width: '100%' }}>
          <span style={{ marginRight: '5px' }}>New User?</span>
          <button type="button" onClick={() => navigate('/register')} style={{ background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}>Register</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
