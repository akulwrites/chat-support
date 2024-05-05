import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function UserChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages([...messages, { text: msg, sender: 'admin' }]);
    });
    socket.on('typing', (status) => {
      setTyping(status);
    });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('message', message);
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
    }
  };

  const handleTyping = (event) => {
    if (event.target.value.trim() !== '') {
      socket.emit('typing', true);
    } else {
      socket.emit('typing', false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '400px', border: '1px solid #ccc', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ textAlign: 'center' }}>Admin</h2>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px' }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: '10px', padding: '8px', borderRadius: '8px', background: msg.sender === 'admin' ? '#f0f0f0' : '#007bff', color: msg.sender === 'admin' ? '#000' : '#fff', alignSelf: msg.sender === 'admin' ? 'flex-start' : 'flex-end' }}>
              {msg.text}
            </div>
          ))}
          {typing && <p style={{ margin: 0 }}>Admin is typing...</p>}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onBlur={() => socket.emit('typing', false)}
          onKeyDown={handleTyping}
          style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '10px' }}
        />
        <button onClick={sendMessage} style={{ width: '100%', padding: '8px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Send</button>
      </div>
    </div>
  );
}

export default UserChat;
