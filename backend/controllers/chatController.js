import Chat from '../models/Chat.js';

export const getMessages = async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const messages = await Chat.find({ sessionId: sessionId }).sort('timestamp');
    res.status(200).json({ success: true, messages: messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { sessionId, sender, senderId, recipient, recipientId, message } = req.body;
    const newMessage = new Chat({
      sessionId: sessionId,
      sender: sender,
      senderId: senderId,
      recipient: recipient,
      recipientId: recipientId,
      message: message,
      timestamp: new Date()
    });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
