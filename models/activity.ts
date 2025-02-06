import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  comment: { type: String, required: true },
  created_date: {
    type: Date,
    default: Date.now,
  },
  habit_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true,
  },
});

const Activity = mongoose.model('Activity', activitySchema);

export { Activity };
