import { User } from '../models/user';
import jwt from 'jsonwebtoken';

export const getVerify = async (request, reply) => {
  try {
    const { token } = request.query;
    const decoded: any = jwt.verify(token, process.env.REGISTER_JWT_SECRET!);
    const user = await User.findOne({ email: decoded.email });

    if (!user)
      return reply.status(404).send({ error: 'Пользователь не найден' });

    user.isVerified = true;
    await user.save();

    reply.send({
      message: 'Ваша почта успешно подтверждена!',
    });
  } catch (error) {
    console.log('error', error);
    reply.status(400).send({ error: 'Недействительный или истекший токен' });
  }
};
