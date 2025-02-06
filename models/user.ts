import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

export { User };
