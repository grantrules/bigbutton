import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { useQuery } from 'urql';
import Login from './pages/Login';
import Index from './pages/Index';
import Private from './pages/Private';
import Register from './pages/Register';
import Class from './pages/Class';
import Auth from './auth/Auth';
import Authorized from './auth/Authorized';

const VERIFY_QUERY = 'query Verify { verify }';

export default () => {
  const [{ data /* , fetching, error */ }/* , reVerify */] = useQuery({ query: VERIFY_QUERY });
  if (!data) return (<></>);
  return (
    <div className="app">
      <Auth activeSession={!!data.verify}>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/login" component={Login} />
          <Authorized>
            <Route path="/private" component={Private} />
          </Authorized>
          <Route path="/register" component={Register} />
          <Route path="/class/:classId" component={Class} />
        </Switch>
      </Auth>
    </div>
  );
};
