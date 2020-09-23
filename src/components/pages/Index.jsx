import React from 'react';
import { Link } from 'react-router-dom';
import Authorized from '../auth/Authorized';

export default () => (
  <>
    <header>
      <h1 className="header">BigButton</h1>
    </header>
    <nav>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <Authorized>
          <li><Link to="/private">Private</Link></li>
        </Authorized>
      </ul>
    </nav>
  </>
);
