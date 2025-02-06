import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  created_date: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Habit = mongoose.model('Habit', habitSchema);

export { Habit };
