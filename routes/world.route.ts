import { Hono } from 'hono';

const worldRoute = new Hono();

worldRoute.get('/world', (c) => {
  return c.json({ message: 'Hello World!' });
});

export default worldRoute;
