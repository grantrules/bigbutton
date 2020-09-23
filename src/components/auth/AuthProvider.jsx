import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'urql';
import AuthContext from '../context/AuthContext';

const LOGIN_QUERY = 'mutation Login($email: String, $password: String) { login(email:$email, password:$password) }';

const LOGOUT_QUERY = 'query Logout { logout }';

function AuthProvider({ activeSession, children }) {
  const [{ activeUser, loginFailed }, setUserState] = useState({
    activeUser: activeSession,
    loginFailed: false,
  });
  const [/* loginResult */, loginQuery] = useMutation(LOGIN_QUERY);
  const [/* loginResult */, logoutQuery] = useMutation(LOGOUT_QUERY);

  const invalidate = async () => logoutQuery({})
    .then(() => setUserState({ activeUser: false, loginFailed: false }));

  const login = async (details) => {
    const { data, error } = await loginQuery(details);
    if (error || data.login === false) {
      setUserState({ activeUser: false, loginFailed: true });
    } else {
      setUserState({ activeUser: true, loginFailed: false });
    }
  };

  const context = {
    activeUser,
    login,
    invalidate,
    loginFailed,
  };
  return (<AuthContext.Provider value={context}>{children}</AuthContext.Provider>);
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  activeSession: PropTypes.bool.isRequired,
};

export default AuthProvider;
