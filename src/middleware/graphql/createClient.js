import {
  createClient, dedupExchange, cacheExchange, fetchExchange, ssrExchange,
} from 'urql';

export default (req, newFetch) => {
  const isServerSide = !process.browser;

  const ssr = ssrExchange({
    isClient: !isServerSide,
    // eslint-disable-next-line no-underscore-dangle
    initialState: !isServerSide ? window.__URQL_DATA__ : undefined,
  });
  const client = createClient({
    url: '/graphql',
    suspense: isServerSide, // This activates urql's Suspense mode on the server-side
    exchanges: [dedupExchange, cacheExchange, ssr, fetchExchange],
    fetch: newFetch || fetch,
  });

  return { ssr, client };
};
