import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div>
    Hello
    <Link to="/login">Login</Link>
    <Link to="/private">Private</Link>
  </div>
);
