import { FastifyInstance } from 'fastify';
import { getVerify } from '../controllers/verify';

export const verifyRoute = (fastify: FastifyInstance) => {
  fastify.get('/verify', getVerify);
};
