import { FastifyInstance } from 'fastify';
import { getActivities, postActivityAdd } from '../controllers/activity';

export const activityRoute = (fastify: FastifyInstance) => {
  fastify.post('/activity/add', postActivityAdd);
  fastify.get('/activities', getActivities);
};
