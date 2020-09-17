import React, { useState } from 'react';

import { useQuery, useMutation } from 'graphql-hooks';

const HOMEPAGE_QUERY = 'query { findMyClasses { id, name, code } }';

function CreateClass() {
  const CREATE_CLASS_MUTATION = `mutation CreateClass($name: String!) {
    createClass(name: $name) {
      name, code
    }
  }`;
  const [createClass] = useMutation(CREATE_CLASS_MUTATION);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createClass({ variables: { name } });
  };

  return (

    <form onSubmit={handleSubmit}>
      <input name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Create class</button>
    </form>
  );
}

function TeacherPage() {
  return (
    <>
      <h1>Welcome</h1>

      <h2>Begin by creating a class and adding students</h2>
      <CreateClass />
      <MyComponent />
    </>
  );
}

function Class({ name, code }) {
  return (
    <li>
      {name}
      {' '}
      {code}
    </li>
  );
}

function MyComponent() {
  const { loading, error, data } = useQuery(HOMEPAGE_QUERY, {});

  if (loading) return 'Loading...';
  if (error) return 'Something Bad Happened';
  console.log(data);
  return (
    <h1>
      {data.findMyClasses.map((cla) => (
        <Class key={cla.id} name={cla.name} code={cla.code} />))}
    </h1>
  );
}

export default TeacherPage;
