import jwt from 'jsonwebtoken';
import { User } from '../models/user';

export const verifyTokenAndGetUser = async (request, reply) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    reply
      .status(401)
      .send({ error: 'Заголовок авторизации отсутствует или недействителен' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    // Расшифровка токена
    const decoded: any = jwt.verify(token, process.env.APP_JWT_SECRET!);

    // Извлекаем _user_id из токена
    const userId = decoded.id;

    // Ищем данные пользователя в базе данных
    const user = await User.findById(userId);

    if (!user) {
      reply.status(404).send({ error: 'Пользователь не найден' });
      return;
    }

    // Возвращаем пользователя
    return user;
  } catch (error) {
    console.log('error', error);
    reply.status(403).send({ error: 'Недействительный или истекший токен' });
  }
};
