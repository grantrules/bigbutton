import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {
  Provider,
} from 'urql';
import createClient from '../../middleware/graphql/createClient';

import Routes from '../Routes';

const { client } = createClient();

function ClientApp() {
  return (
    <Provider value={client}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.hydrate(<ClientApp />,
  document.querySelector('#content'));
