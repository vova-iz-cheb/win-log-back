import { FastifyInstance } from 'fastify';
import { postRegister } from '../controllers/register';

export const registerRoute = (fastify: FastifyInstance) => {
  fastify.post('/register', postRegister);
};
