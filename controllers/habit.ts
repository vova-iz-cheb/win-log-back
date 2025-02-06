import { Habit } from '../models/habit';
import { verifyTokenAndGetUser } from '../utils/verifyTokenAndGetUser';

export const postHabitAdd = async (request, reply) => {
  const user = await verifyTokenAndGetUser(request, reply);
  if (!user) return;

  const { name, description } = request.body;

  if (!name) {
    return reply
      .status(400)
      .send({ error: 'Необходимо указать название привычки.' });
  }

  try {
    // создаем привычку
    const habit = new Habit({ name, description, user_id: user._id });
    await habit.save();

    reply.status(201).send({
      message: 'Привычка успешно создана!',
    });
  } catch (error) {
    console.log('error', error);
    return reply.status(500).send({ error: 'Не удалось создать привычку' });
  }
};

export const getHabits = async (request, reply) => {
  const user = await verifyTokenAndGetUser(request, reply);
  if (!user) return;

  try {
    const habits = await Habit.find({ user_id: user._id });
    reply.status(200).send(habits);
  } catch (error) {
    console.log('error', error);
    return reply.status(500).send({ error: 'Не удалось загрузить привычки' });
  }
};
