import Fastify from 'fastify';
import mongoose from 'mongoose';
import path from 'path';
import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import dotenv from 'dotenv';
import { userRoute } from './routes/users';
import { registerRoute } from './routes/register';
import { loginRoute } from './routes/login';
import { verifyRoute } from './routes/verify';
import { habitRoute } from './routes/habit';
import { activityRoute } from './routes/activity';

// Загружаем переменные окружения из .env файла
dotenv.config();

const fastify = Fastify({
  logger: true,
});

// Connect to MongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB!, {});
    fastify.log.info('Connected to MongoDB');
  } catch (error) {
    fastify.log.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Подключаем fastify-static для работы со статическими файлами
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/public/',
});

// Регистрация плагина для CORS
fastify.register(fastifyCors, {
  // Для разрешения запросов с любого источника
  origin: '*', // Можно указать определённые источники, например, ['http://localhost:3000']
});

userRoute(fastify);
registerRoute(fastify);
loginRoute(fastify);
verifyRoute(fastify);
habitRoute(fastify);
activityRoute(fastify);

(async () => {
  try {
    await connectToDB();
    const port =
      (typeof process.env.PORT === 'string' && +process.env.PORT) || 3000;
    await fastify.listen({ port, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
