import { Activity } from '../models/activity';
import { Habit } from '../models/habit';
import { verifyTokenAndGetUser } from '../utils/verifyTokenAndGetUser';

export const postActivityAdd = async (request, reply) => {
  const user = await verifyTokenAndGetUser(request, reply);
  if (!user) return;

  try {
    const { comment, habit_id } = request.body;

    if (!comment) {
      return reply
        .status(400)
        .send({ error: 'Необходимо описать активность.' });
    }

    if (!habit_id) {
      return reply
        .status(400)
        .send({ error: 'Не указан идентификатор привычки.' });
    }

    const habit = await Habit.findById(habit_id, 'user_id');

    if (habit?.user_id?.toString() !== user.id) {
      return reply
        .status(400)
        .send({ error: 'Нельзя создавать активности под чужими привычками.' });
    }

    // создаем активность
    const activity = new Activity({ comment, habit_id });
    await activity.save();

    reply.status(201).send({
      message: 'Активность успешно создана!',
    });
  } catch (error) {
    console.log('error', error);
    return reply.status(500).send({ error: 'Не удалось добавить активность.' });
  }
};

export const getActivities = async (request, reply) => {
  const user = await verifyTokenAndGetUser(request, reply);
  if (!user) return;

  try {
    const { habit: habit_id } = request.query;
    console.log('habit_id', habit_id);

    if (!habit_id) {
      return reply
        .status(400)
        .send({ error: 'Не указан идентификатор привычки.' });
    }

    const habit = await Habit.findById(habit_id, 'user_id');

    if (habit?.user_id?.toString() !== user.id) {
      return reply
        .status(400)
        .send({ error: 'Нельзя загружать не свои активности.' });
    }

    const activities = await Activity.find({ habit_id });
    reply.status(200).send(activities);
  } catch (error) {
    console.log('error', error);
    return reply
      .status(500)
      .send({ error: 'Не удалось загрузить активности.' });
  }
};
