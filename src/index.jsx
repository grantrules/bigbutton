import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import redis from 'redis';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import prepass from 'react-ssr-prepass';

import { graphql } from 'graphql';
import ServerApp from './components/apps/ServerApp';
import html from './html';
import createClient from './middleware/graphql/createClient';
import createServer from './middleware/graphql/createServer';

// eslint-disable-next-line no-unused-vars
import './models';

import schema from './schema';

const app = express();

const RedisStore = connectRedis(session);
const redisClient = redis.createClient('redis://redis');

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

app.use(
  '/public',
  express.static('public'),
);

const notFetch = (ctx) => (_, { body }) => {
  const { query, variables } = JSON.parse(body);
  const result = { ok: true, json() { return Promise.resolve(this.data); }, data: {} };
  return graphql(schema, query, {}, ctx, variables)
    .then((res) => { result.data = res; return result; });
};

app.get('/*', async (req, res) => {
  const { client, ssr } = createClient(req, notFetch(req));
  const App = (
    <ServerApp client={client} req={req} />
  );

  await prepass(App);
  const r = ReactDOMServer.renderToString(App);
  const initialState = JSON.stringify(ssr.extractData());

  res.write(html(r, initialState));
  res.end();
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
