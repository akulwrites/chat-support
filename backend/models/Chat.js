import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const chatSchema = new Schema({
  sender: {
    type: String,
    enum: ['admin', 'user'],
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  recipient: {
    type: String,
    enum: ['admin', 'user'],
    required: true,
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default model('Chat', chatSchema);
