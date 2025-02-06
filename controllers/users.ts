import { User } from '../models/user';
import { verifyTokenAndGetUser } from '../utils/verifyTokenAndGetUser';

export const getUsers = async (request, reply) => {
  try {
    const users = await User.find();
    reply.send(users);
  } catch (error) {
    reply.status(500).send({ error: 'Внутренняя ошибка сервера' });
  }
};

export const getUserSettings = async (request, reply) => {
  const user = await verifyTokenAndGetUser(request, reply);

  // Возвращаем настройки пользователя
  if (user) reply.send({ settings: user.email });
};
