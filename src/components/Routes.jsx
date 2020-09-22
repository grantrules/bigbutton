import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Index from './pages/Index';
import Private from './pages/Private';
import Register from './pages/Register';
import Class from './pages/Class';

export default () => (
  <Switch>
    <Route exact path="/" component={Index} />
    <Route path="/login" component={Login} />
    <Route path="/private" component={Private} />
    <Route path="/register" component={Register} />
    <Route path="/class/:classId" component={Class} />
  </Switch>
);
