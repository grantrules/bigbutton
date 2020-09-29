import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useQuery, useMutation } from 'urql';
import { Link } from 'react-router-dom';
import { useI18N } from '../context/I18NProvider';

const HOMEPAGE_QUERY = 'query { findMyClasses { id, name, code } }';

function CreateClass() {
  const { t } = useI18N();

  const CREATE_CLASS_MUTATION = `mutation CreateClass($name: String!) {
    createClass(name: $name) {
      name, code
    }
  }`;
  const [/* createClassResult */, createClass] = useMutation(CREATE_CLASS_MUTATION);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createClass({ name });
  };

  return (

    <form onSubmit={handleSubmit}>
      <input name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">{t`Create class`}</button>
    </form>
  );
}

function TeacherPage() {
  const { t } = useI18N();

  return (
    <>
      <h1>{t`Welcome`}</h1>

      <h2>{t`Begin by creating a class and adding students`}</h2>
      <CreateClass />
      <MyComponent />
    </>
  );
}

function Class({ id, name, code }) {
  return (
    <li>
      <Link to={`/class/${id}`}>{name}</Link>
      {' '}
      {code}
    </li>
  );
}
Class.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  code: PropTypes.string,
};
Class.defaultProps = {
  id: '',
  name: '',
  code: '',
};

function MyComponent() {
  const { t } = useI18N();

  const [{ data, fetching, error }/* , reexecuteQuery */] = useQuery({ query: HOMEPAGE_QUERY });

  if (fetching) return (<>{t`Loading...`}</>);
  if (error) return (<>{t`Something Bad Happened`}</>);
  return (
    <ul>
      {data.findMyClasses.map((cla) => (
        <Class key={cla.id} id={cla.id} name={cla.name} code={cla.code} />))}
    </ul>
  );
}

export default TeacherPage;
