// UserProfile.js
import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const { Schema, model } = mongoose;

// Initialize auto-increment plugin
autoIncrement.initialize(mongoose.connection);

const userProfileSchema = new Schema({
  userId: {
    type: Number, // Use Number type for auto-incrementing field
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});

userProfileSchema.plugin(autoIncrement.plugin, {
  model: 'UserProfile',
  field: 'userId',
  startAt: 2,
  incrementBy: 1,
});

export default model('UserProfile', userProfileSchema);
