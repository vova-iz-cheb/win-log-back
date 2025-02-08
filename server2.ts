import Fastify from 'fastify';
import { userRoute } from './routes/users';
import { registerRoute } from './routes/register';
import { loginRoute } from './routes/login';
import { verifyRoute } from './routes/verify';
import { habitRoute } from './routes/habit';
import { activityRoute } from './routes/activity';
import fastifyCors from '@fastify/cors';
import mongoose from 'mongoose';

export function init() {
  const connectToDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB!, {});
      fastify.log.info('Connected to MongoDB');
    } catch (error) {
      fastify.log.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  };
  // Instantiate Fastify with some config
  const fastify = Fastify({
    logger: true,
  });

  // Регистрация плагина для CORS
  fastify.register(fastifyCors, {
    // Для разрешения запросов с любого источника
    origin: '*', // Можно указать определённые источники, например, ['http://localhost:3000']
  });

  fastify.get('/', async (request, reply) => {
    return { message: 'API is running!' };
  });

  userRoute(fastify);
  registerRoute(fastify);
  loginRoute(fastify);
  verifyRoute(fastify);
  habitRoute(fastify);
  activityRoute(fastify);

  // (async () => {
  //   try {
  connectToDB()
    .then(() => {
      console.log('BD connected');
    })
    .catch((e) => {
      console.log('DB error');
    });
  // const port =
  //   (typeof process.env.PORT === 'string' && +process.env.PORT) || 3000;
  // await fastify.listen({ port, host: '0.0.0.0' });
  //   } catch (err) {
  //     fastify.log.error(err);
  //     process.exit(1);
  //   }
  // })();

  return fastify;
}

// Execute the app when called directly( ex.: "npm run dev")
if (require.main === module) {
  init()
    .listen({
      port: 3333,
    })
    .then(() => {
      console.log('Running on port 3333');
    });
}
