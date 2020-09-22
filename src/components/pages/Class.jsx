import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useQuery, useMutation } from 'urql';
import { useParams } from 'react-router';

const HOMEPAGE_QUERY = 'query ($classId: String!) { findMyClass(classId: $classId) { id, code} }';

function CreateStudent() {
  const CREATE_STUDENT_MUTATION = `mutation CreateStudent($name: String!, $classId: String!) {
    createStudent(name: $name, classId: $classId) {
      name
    }
  }`;
  const [/* createClassResult */, createStudent] = useMutation(CREATE_STUDENT_MUTATION);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createStudent({ name });
  };

  return (

    <form onSubmit={handleSubmit}>
      <input name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Add Student</button>
    </form>
  );
}

function ClassPage() {
  const { classId } = useParams();
  return (
    <>
      <h1>Class</h1>
      <div>{classId}</div>

      <CreateStudent />
      <MyComponent classId={classId} />
    </>
  );
}

function Student({ name }) {
  return (
    <li>
      {name}
    </li>
  );
}
Student.propTypes = {
  name: PropTypes.string,
};
Student.defaultProps = {
  name: '',
};

function MyComponent({ classId }) {
  const [{ data, fetching, error }/* , reexecuteQuery */] = useQuery({
    query: HOMEPAGE_QUERY, variables: { classId },
  });

  if (fetching) return 'Loading...';
  if (error) return 'Something Bad Happened';
  return (
    <h1>{data.name}</h1>
  );
}

export default ClassPage;
