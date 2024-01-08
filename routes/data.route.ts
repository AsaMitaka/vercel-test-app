import { Hono } from 'hono';
import { data } from '../assets/db';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const dataRoute = new Hono();

dataRoute.get('/', (c) => {
  return c.json(data);
});

dataRoute.get('/:id', (c) => {
  const id = Number(c.req.param('id'));

  if (isNaN(id)) {
    return c.json({ error: 'Invalid ID format' });
  }
  const foundedData = data.find((item) => item.id === id);

  if (!foundedData) {
    c.notFound();
  }

  return c.json(foundedData);
});

dataRoute.post(
  '/',
  zValidator(
    'json',
    z.object({
      name: z.string(),
      number: z.string(),
    }),
  ),
  async (c) => {
    const userData = await c.req.json();
    const isExist = data.find((item) => item.name === userData.name);

    if (isExist) {
      return c.json({ message: 'Exist' });
    }

    if (!userData.name || !userData.number) {
      return c.json({
        error: 'Name and number are required fields',
      });
    }

    const maxId = data.length > 0 ? Math.max(...data.map((item) => item.id)) : 0;

    const newData = {
      id: maxId + 1,
      name: userData.name,
      number: userData.number,
    };

    data.push(newData);
    return c.json({ message: `Posted` });
  },
);

dataRoute.delete('/:id', (c) => {
  const id = Number(c.req.param('id'));

  if (isNaN(id)) {
    return c.json({ error: 'Invalid ID format' });
  }

  const itemIndex = data.findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    return c.notFound();
  }

  const deletedContact = data.splice(itemIndex, 1)[0];
  return c.json({ message: 'Contact deleted successfully', deletedContact });
});

export default dataRoute;
