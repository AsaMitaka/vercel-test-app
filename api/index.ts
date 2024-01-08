import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import checkCountryMiddleware from '../middleware';
import { dataRoute, helloRoute, worldRoute } from '../routes';

export const config = {
  runtime: 'edge',
};

const app = new Hono().basePath('/api');

app.use(checkCountryMiddleware);
app.route('/data', dataRoute);
app.route('/hello', helloRoute);
app.route('/world', worldRoute);

export default handle(app);
