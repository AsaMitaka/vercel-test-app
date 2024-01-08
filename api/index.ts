import { Hono } from 'hono';
import { handle } from 'hono/vercel';

export const config = {
  runtime: 'edge',
};

const app = new Hono().basePath('/api');

app.get('/hello', (c) => {
  return c.json({ message: 'Hello Hono!' });
});

app.get('/test', (c) => {
  return c.json({ message: 'Test!' });
});

app.get('/world', (c) => {
  return c.json({ message: 'World!' });
});

export default handle(app);
