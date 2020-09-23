import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router';
import Authorized from '../auth/Authorized';
import AuthContext from '../context/AuthContext';

function Login() {
  const [values, setValues] = useState({ email: '', password: '' });
  const { login, loginFailed } = useContext(AuthContext);

  const handleChange = (name) => (e) => { setValues({ ...values, [name]: e.target.value }); };

  const submitForm = async (event) => {
    event.preventDefault();
    login({
      email: values.email,
      password: values.password,
    });
  };
  return (
    <form onSubmit={submitForm}>
      <Authorized>
        <Redirect to="/" />
      </Authorized>

      {loginFailed && 'Failed'}

      <input
        type="text"
        value={values.email}
        onChange={handleChange('email')}
        id="email"
        label="Email Address"
        placeholder="Email Address"
        required
      />
      <br />

      <input
        value={values.password}
        onChange={handleChange('password')}
        id="standard-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        required
      />
      <br />

      <button type="submit">
        Log In
      </button>
    </form>
  );
}

export default Login;
