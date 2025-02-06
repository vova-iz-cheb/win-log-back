import { FastifyInstance } from 'fastify';
import { getUsers, getUserSettings } from '../controllers/users';

export const userRoute = (fastify: FastifyInstance) => {
  fastify.get('/users', getUsers);
  fastify.get('/user/settings', getUserSettings);
};
