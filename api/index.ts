import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { html, raw } from 'hono/html';

export const config = {
  runtime: 'edge',
};

const app = new Hono().basePath('/api');

app.get('/hello', (c) => {
  return c.json({ message: 'Hello Hono!' });
});

app.get('/test', (c) => {
  const countryCode = c.req.header('x-vercel-ip-country');

  return c.html(
    html`<!DOCTYPE html>
      <h1>Hello! U from ${countryCode}!</h1>`,
  );
});

export default handle(app);
