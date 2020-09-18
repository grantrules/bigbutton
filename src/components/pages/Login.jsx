import React from 'react';
import { useMutation } from 'urql';

const LOGIN_QUERY = 'query Login($email: String, $password: String) { login(email:$email, password:$password) }';

function Login() {
  const [values, setValues] = React.useState({ email: '', password: '' });

  const [/* loginResult */, login] = useMutation(LOGIN_QUERY);

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
