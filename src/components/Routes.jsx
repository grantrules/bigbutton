import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { useQuery } from 'urql';
import Login from './pages/Login';
import Index from './pages/Index';
import Private from './pages/Private';
import Register from './pages/Register';
import Class from './pages/Class';
import Classroom from './pages/StudentClassroom';
import { AuthProvider } from './context/AuthProvider';
import Authorized from './auth/Authorized';
import { I18NProvider } from './context/I18NProvider';
import { StoreProvider } from './context/StoreProvider';

const VERIFY_QUERY = 'query Verify { verify }';

export default () => {
  const [{ data /* , fetching, error */ }/* , reVerify */] = useQuery({ query: VERIFY_QUERY });
  if (!data) return (<></>);
  return (
    <div className="app">
      <StoreProvider>
        <I18NProvider language="en">
          <AuthProvider activeSession={!!data.verify}>
            <Switch>
              <Route exact path="/" component={Index} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/class/:classId" component={Class} />
              <Route path="/:code([A-Z]{4,5})" component={Classroom} sensitive />
              <Authorized>
                {/* authorized routes must be last */}
                <Route path="/private" component={Private} />
              </Authorized>
            </Switch>
          </AuthProvider>
        </I18NProvider>
      </StoreProvider>
    </div>
  );
};
