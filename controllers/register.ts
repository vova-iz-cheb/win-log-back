import { User } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

let transporter;

const sendVerificationEmail = async (email, token) => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD,
      },
    });
  }
  const link = `${process.env.VERIFY_URL}?token=${token}`;

  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: 'Подтвердите свою почту',
    html: `<p>Нажмите <a href="${link}">здесь</a> чтобы подтвердить свою почту.</p>`,
  });
};

export const postRegister = async (request, reply) => {
  try {
    const { email, password } = request.body;

    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.BCRYPT_SALT!
    );

    const user = new User({ email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ email }, process.env.REGISTER_JWT_SECRET!, {
      expiresIn: '1h',
    });

    await sendVerificationEmail(email, token);

    reply.status(201).send({
      message:
        'На вашу почту отправлено письмо с подтверждением. После подтверждения почты вы можете нажать кнопку Войти',
    });
  } catch (error) {
    console.log('error', error);
    reply.status(400).send({ error: 'Ошибка при регистрации' });
  }
};
