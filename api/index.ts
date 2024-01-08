import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { html } from 'hono/html';

export const config = {
  runtime: 'edge',
};

const app = new Hono().basePath('/api');

app.get('/hello', (c) => {
  return c.json({ message: 'Hello Hono!' });
});

app.get('/test', (c) => {
  const blockedCountryCode = ['UA'];
  const incomingCountryCode = c.req.header('x-vercel-ip-country');

  if (blockedCountryCode.includes(incomingCountryCode?.toUpperCase())) {
    return c.html(
      html`<!DOCTYPE html>
        <h1>Hello! U from ${incomingCountryCode}! U have blocked!</h1>`,
    );
  }

  return c.html(
    html`<!DOCTYPE html>
      <h1>Hello! U from ${incomingCountryCode}!</h1>`,
  );
});

export default handle(app);
