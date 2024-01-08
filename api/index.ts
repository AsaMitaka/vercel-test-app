import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { z } from 'zod';
import { data } from '../assets/db';

export const config = {
  runtime: 'edge',
};

const app = new Hono().basePath('/api');

app.get('/world', (c) => {
  return c.json({ message: 'Hello World!' });
});

app.get(
  '/hello',
  zValidator(
    'query',
    z.object({
      name: z.string(),
    }),
  ),
  (c) => {
    const { name } = c.req.valid('query');
    return c.json({ message: `Hello ${name}` });
  },
);

app.get('/data/:id', (c) => {
  const id = c.req.param('id');
  const foundedData = data.find((item) => item.id === Number(id));

  if (!foundedData) {
    c.json({ message: 'Not Found!' });
  }

  return c.json(foundedData);
});

export default handle(app);

// app.get('/test', (c) => {
//   const blockedCountryCode = ['US', 'RU', 'BG', 'CN'];
//   const incomingCountryCode = c.req.header('x-vercel-ip-country') || 'UA';

//   if (blockedCountryCode.includes(incomingCountryCode.toUpperCase())) {
//     return c.html(
//       html`<!DOCTYPE html>
//         <h1>Hello! U from ${incomingCountryCode}! U have blocked!</h1>`,
//     );
//   }

//   return c.html(
//     html`<!DOCTYPE html>
//       <h1>Hello! U from ${incomingCountryCode}!</h1>`,
//   );
// });
