import { graphql } from 'graphql';
import { GraphQLClient } from 'graphql-hooks';
import memCache from 'graphql-hooks-memcache';
import schema from '../../schema';

let graphQLClient = null;

const notFetch = (ctx) => (_, { body }) => {
  const { query } = JSON.parse(body);
  const result = { ok: true, json() { return Promise.resolve(this.data); }, data: {} };

  return graphql(schema, query, {}, ctx).then((res) => { result.data = res; return result; });
};

const create = (initialState = {}, ctx = {}) => new GraphQLClient({
  ssrMode: !process.browser,
  url: '/graphql',
  cache: memCache({ initialState }),
    fetch: process.browser ? fetch.bind() : notFetch(ctx) // eslint-disable-line
});

export default (initialState, ctx) => {
  if (!process.browser) {
    return create(initialState, ctx);
  }
  if (!graphQLClient) {
    graphQLClient = create(initialState);
  }
  return graphQLClient;
};
