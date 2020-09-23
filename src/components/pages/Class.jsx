import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useQuery, useMutation } from 'urql';
import { useParams } from 'react-router';

const HOMEPAGE_QUERY = 'query ($classId: String!) { findMyClass(classId: $classId) { id, name, Students { id, name } } }';

function CreateStudent({ classId }) {
  const CREATE_STUDENT_MUTATION = `mutation CreateStudent($name: String!, $classId: String!) {
    createStudent(name: $name, classId: $classId) {
      name
    }
  }`;
  const [/* createClassResult */, createStudent] = useMutation(CREATE_STUDENT_MUTATION);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createStudent({ name, classId });
  };

  return (

    <form onSubmit={handleSubmit}>
      <input name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Add Student</button>
    </form>
  );
}

CreateStudent.propTypes = {
  classId: PropTypes.string,
};
CreateStudent.defaultProps = {
  classId: '',
};

function CreateButton({ classId }) {
  const CREATE_BUTTON_MUTATION = `mutation CreateButton($color: String!, $classId: String!) {
    createButton(color: $color, classId: $classId) {
      id, color
    }
  }`;
  const [/* createClassResult */, createButton] = useMutation(CREATE_BUTTON_MUTATION);
  const [color, setColor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createButton({ color, classId });
  };

  return (

    <form onSubmit={handleSubmit}>
      <select onChange={(e) => setColor(e.target.value)}>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
      </select>
      <button type="submit">Add Button</button>
    </form>
  );
}

CreateButton.propTypes = {
  classId: PropTypes.string,
};
CreateButton.defaultProps = {
  classId: '',
};

function ClassPage() {
  const { classId } = useParams();
  return (
    <>
      <h1>Class</h1>
      <div>{classId}</div>

      <CreateStudent classId={classId} />
      <CreateButton classId={classId} />
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
    <>
      <h1>{data.findMyClass.name}</h1>

      <ul>
        {(data.findMyClass.Students || [])
          .map((student) => (<li key={student.id}>{student.name}</li>))}
      </ul>
    </>
  );
}

MyComponent.propTypes = {
  classId: PropTypes.string,
};
MyComponent.defaultProps = {
  classId: '',
};

export default ClassPage;
