import { FastifyInstance } from 'fastify';
import { postLogin } from '../controllers/login';

export const loginRoute = (fastify: FastifyInstance) => {
  fastify.post('/login', postLogin);
};
