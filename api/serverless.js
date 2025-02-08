// Read the .env file.
import * as dotenv from 'dotenv';
dotenv.config();

// Require the framework
import { init } from '../dist/server';

export default async (req, res) => {
  const app = init();
  await app.ready();
  app.server.emit('request', req, res);
};
