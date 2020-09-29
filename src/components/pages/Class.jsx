import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useQuery, useMutation } from 'urql';
import { useParams } from 'react-router';

const HOMEPAGE_QUERY = 'query ($classId: String!) { findMyClass(classId: $classId) { id, name, Students { id, name }, Buttons { id, color } } }';

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
  const [color, setColor] = useState('red');

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

function DeleteStudent({ studentId, classId, onDelete }) {
  const DELETE_STUDENT_MUTATION = `mutation DeleteStudent($studentId: String!, $classId: String!) {
    deleteStudent(studentId: $studentId, classId: $classId)
  }`;
  const [/* createClassResult */, deleteStudent] = useMutation(DELETE_STUDENT_MUTATION);

  const click = () => {
    deleteStudent({ studentId, classId }).then(() => onDelete());
  };
  return (<button type="button" onClick={click}>delete</button>);
}

function Student({ name, children }) {
  return (
    <li>
      {name}
      {children}
    </li>
  );
}
Student.propTypes = {
  name: PropTypes.string,
};
Student.defaultProps = {
  name: '',
};

function MyStudent({ id, classId, name }) {
  const [deleted, setDeleted] = useState(false);
  if (deleted) {
    return (<></>);
  }
  return (
    <Student key={id} name={name}>
      <DeleteStudent classId={classId} studentId={id} onDelete={() => setDeleted(true)} />
    </Student>
  );
}

function Button({ id, color }) {
  return (
    <>
      <button id={`button${id}`} style={{ backgroundColor: color }} type="button">
        {color}
        button
      </button>

    </>
  );
}

Button.propTypes = {
  id: PropTypes.string,
  color: PropTypes.string,
};
Button.defaultProps = {
  id: '',
  color: '',
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
        {(data.findMyClass.Buttons || [])
          .map(({ id, color }) => (<Button id={id} color={color} key={id} />))}
      </ul>

      <ul>
        {(data.findMyClass.Students || [])
          .map((student) => (
            <MyStudent
              key={student.id}
              name={student.name}
              id={student.id}
              classId={data.findMyClass.id}
            />
          ))}
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
