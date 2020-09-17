import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import redis from 'redis';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { getInitialState } from 'graphql-hooks-ssr';

import ServerApp from './components/apps/ServerApp';
import html from './html';
import createClient from './middleware/graphql/createClient';
import createServer from './middleware/graphql/createServer';

// eslint-disable-next-line no-unused-vars
import './models';

const app = express();

const RedisStore = connectRedis(session);
const redisClient = redis.createClient("redis://redis");

app.use(session({
  store: new RedisStore({ client: redisClient }), secret: 'keyboard cat', resave: false, saveUninitialized: false,
}));

app.use(
  '/graphql',
  createServer(),
);

// nginx should cache these
app.use(
  '/static',
  express.static('dist'),
);

app.get('/*', async (req, res) => {
  const client = createClient({}, req);

  const App = (
    <ServerApp client={client} req={req} />
  );

  const initialState = await getInitialState({ App, client });

  const r = ReactDOMServer.renderToString(App);
  res.write(html(r, initialState));
  res.end();
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
