// server.js
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server); // Create socket.io server using http.Server instance

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Connect to MongoDB (replace <dbname> with your actual database name)
mongoose.connect('mongodb+srv://akulagarwal2410:Akul@07@chat-support.mvijmfy.mongodb.net/UserProfile', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});

// Socket.io
io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  socket.on('sendMessage', (message) => {
    // Assuming message object contains senderId, recipientId, and message content
    const { senderId, recipientId, content } = message;

    // Send the message to the recipient only if it's the intended recipient's socket
    const recipientSocket = io.sockets.sockets.get(recipientId);
    if (recipientSocket) {
      recipientSocket.emit('receiveMessage', { senderId, content });
    } else {
      // Handle the case when the recipient is not connected
      console.log('Recipient is not connected:', recipientId);
    }
  });

  socket.on('disconnect', () => {
    console.log('Disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
console.log(`>>>>>PORT>>>>`, PORT);
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
