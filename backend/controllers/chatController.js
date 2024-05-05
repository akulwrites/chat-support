import UserProfile from '../models/UserProfile.js';

export const getMessages = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const sendMessage = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
