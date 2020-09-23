import React from 'react';

import { useMutation } from 'urql';
import TextInput from '../widgets/TextInput';

const REGISTER_QUERY = 'query Register($email: String, $password: String, $name: String, $school: String) { register(email:$email, password:$password, name:$name, school:$school) }';

function Register() {
  const [values, setValues] = React.useState({
    email: '', password: '', passwordconfirm: '', name: '', school: '',
  });
  const [/* registerResult */, register] = useMutation(REGISTER_QUERY);

  const handleChange = (name) => (e) => { setValues({ ...values, [name]: e.target.value }); };

  const handleSubmit = async (event) => {
    event.preventDefault();
    register({
      email: values.email,
      password: values.password,
      name: values.name,
      school: values.school,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="register">
      <TextInput
        value={values.email}
        onChange={handleChange('email')}
        label="Email"
        type="email"
        id="email"
        placeholder="teacher@school.edu"
        required
      />
      <TextInput
        value={values.name}
        onChange={handleChange('name')}
        id="name"
        label="Your Name"
        placeholder="Ms. Wagner"
        required
      />
      <TextInput
        value={values.school}
        onChange={handleChange('school')}
        id="school"
        label="School"
        placeholder="Bayside High School"
        required
      />
      <TextInput
        value={values.password}
        onChange={handleChange('password')}
        id="password"
        label="Password"
        placeholder="Password"
        type="password"
        margin="normal"
        required
      />
      <TextInput
        value={values.passwordconfirm}
        onChange={handleChange('passwordconfirm')}
        id="passwordconfirm"
        label="Confirm Password"
        placeholder="Password"
        type="password"
        required
      />

      <button type="submit">
        Register
      </button>
    </form>
  );
}
export default Register;
