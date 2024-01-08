import { Hono } from 'hono';
import { handle } from 'hono/vercel';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

app.get('/hello', (c) => {
  return c.json({ message: 'Hello Hono!' });
});

app.get('/test', (c) => {
  return c.json({ message: 'Test!' });
});

export const GET = handle(app);
