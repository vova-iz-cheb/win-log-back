import Fastify, { FastifyInstance } from 'fastify';
import { userRoute } from './routes/users';
import { registerRoute } from './routes/register';
import { loginRoute } from './routes/login';
import { verifyRoute } from './routes/verify';
import { habitRoute } from './routes/habit';
import { activityRoute } from './routes/activity';

async function appRoutes(app: FastifyInstance) {
  app.get('/', () => {
    return {
      message: 'Hello World!123',
    };
  });
}

export function init() {
  // Instantiate Fastify with some config
  const fastify = Fastify({
    logger: true,
  });

  // Require the routes for the app
  // fastify.register(appRoutes);

  fastify.get('/', async (request, reply) => {
    return { message: 'API is running!' };
  });

  userRoute(fastify);
  registerRoute(fastify);
  loginRoute(fastify);
  verifyRoute(fastify);
  habitRoute(fastify);
  activityRoute(fastify);

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
