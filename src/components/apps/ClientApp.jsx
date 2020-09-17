import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import Routes from '../Routes';

const client = new GraphQLClient({
  url: '/graphql',
});

function ClientApp() {
  return (
    <ClientContext.Provider value={client}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ClientContext.Provider>
  );
}

ReactDOM.hydrate(<ClientApp />,
  document.querySelector('#content'));
