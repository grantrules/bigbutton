import React from 'react';
import { useManualQuery } from 'graphql-hooks';

const LOGIN_QUERY = 'query Login($email: String, $password: String) { login(email:$email, password:$password) }';

function Login() {
  const [values, setValues] = React.useState({ email: '', password: '' });

  const [login] = useManualQuery(LOGIN_QUERY);

  const handleChange = (name) => (e) => { setValues({ ...values, [name]: e.target.value }); };

  const submitForm = async (event) => {
    event.preventDefault();
    await login({
      variables: {
        email: values.email,
        password: values.password,
      },
    });

    // alert(data);
  };
  return (
    <form onSubmit={submitForm}>

      <input
        type="text"
        autoFocus="autofocus"
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
