/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { StaticRouter } from 'react-router';
import { Provider } from 'urql';
import Routes from '../Routes';

const context = {};

function ServerApp({ req, client }) {
  return (
    <Provider value={client}>
      <StaticRouter location={req.url} context={context}>
        <Routes />
      </StaticRouter>
    </Provider>
  );
}

ServerApp.propTypes = {
  req: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
};

export default ServerApp;
