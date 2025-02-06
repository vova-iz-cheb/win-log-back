import { User } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const postLogin = async (request, reply) => {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.isVerified)
      return reply.status(400).send({
        error:
          'Недействительные учетные данные или неподтвержденная электронная почта',
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return reply
        .status(400)
        .send({ error: 'Недействительные учетные данные' });

    const token = jwt.sign({ id: user._id }, process.env.APP_JWT_SECRET!, {
      // expiresIn: '1h', // NOT EXPIRED
    });
    reply.send({ token });
  } catch (error) {
    console.log('error', error);
    reply.status(500).send({ error: 'Ошибка сервера' });
  }
};
