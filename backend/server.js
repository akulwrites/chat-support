import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

mongoose.connect('mongodb+srv://akulagarwal2410:<password>@chat-support.mvijmfy.mongodb.net/UserProfile', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});

io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  socket.on('sendMessage', (message) => {
    const { senderId, recipientId, content } = message;

    const recipientSocket = io.sockets.sockets.get(recipientId);
    if (recipientSocket) {
      recipientSocket.emit('receiveMessage', { senderId, content });
    } else {
      console.log('Recipient is not connected:', recipientId);
    }
  });

  socket.on('disconnect', () => {
    console.log('Disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
