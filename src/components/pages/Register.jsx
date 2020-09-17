import React from 'react';

import { useManualQuery } from 'graphql-hooks';

const REGISTER_QUERY = 'query Register($email: String, $password: String, $name: String, $school: String) { register(email:$email, password:$password, name:$name, school:$school) }';

function Register() {
  const [values, setValues] = React.useState({
    email: '', password: '', passwordconfirm: '', name: '', school: '',
  });
  const [register] = useManualQuery(REGISTER_QUERY);

  const handleChange = (name) => (e) => { setValues({ ...values, [name]: e.target.value }); };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await register({
      variables: {
        email: values.email,
        password: values.password,
        name: values.name,
        school: values.school,
      },
    });

    // alert(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={values.email}
        onChange={handleChange('email')}
        type="email"
        id="email"
        placeholder="Email Address"
        required
      />
      <input
        value={values.name}
        onChange={handleChange('name')}
        id="name"
        placeholder="Your Name"
        required
      />
      <input
        value={values.school}
        onChange={handleChange('school')}
        id="school"
        placeholder="School"
        required
      />
      <input
        value={values.password}
        onChange={handleChange('password')}
        id="password"
        label="Password"
        placeholder="Password"
        type="password"
        margin="normal"
        required
      />
      <input
        value={values.passwordconfirm}
        onChange={handleChange('passwordconfirm')}
        id="passwordconfirm"
        label="Confirm Password"
        placeholder="Confirm Password"
        type="password"
        required
      />
      <br />

      <button type="submit">
        Register
      </button>
    </form>
  );
}
export default Register;
