import { FastifyInstance } from 'fastify';
import { postHabitAdd, getHabits } from '../controllers/habit';

export const habitRoute = (fastify: FastifyInstance) => {
  fastify.post('/habit/add', postHabitAdd);
  fastify.get('/habits', getHabits);
};
