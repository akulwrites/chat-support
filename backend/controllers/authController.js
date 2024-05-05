import UserProfile from '../models/UserProfile.js';

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await UserProfile.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username already exists. Please choose a different one or log in.' });
    }

    const newUserProfile = await UserProfile.create({ username, password });

    res.status(201).json({ success: true, userProfile: newUserProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userProfile = await UserProfile.findOne({ username });

    if (!userProfile || userProfile.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
