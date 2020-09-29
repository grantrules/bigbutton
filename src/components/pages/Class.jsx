import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useQuery, useMutation } from 'urql';
import { useParams } from 'react-router';

import { MyButton } from '../widgets/Button';
import { MyStudent } from '../widgets/Student';
import { useI18N } from '../context/I18NProvider';

const HOMEPAGE_QUERY = 'query ($classId: String!) { findMyClass(classId: $classId) { id, name, code, Students { id, name }, Buttons { id, color } } }';

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

  const { t } = useI18N();

  return (
    <>
      <h1>{t('Class')}</h1>
      <div>{classId}</div>

      <CreateStudent classId={classId} />
      <CreateButton classId={classId} />
      <MyComponent classId={classId} />
    </>
  );
}

function MyComponent({ classId }) {
  const [{ data, fetching, error }/* , reexecuteQuery */] = useQuery({
    query: HOMEPAGE_QUERY, variables: { classId },
  });

  const [started, setStarted] = useState(false);

  const startClass = () => {
    setStarted(true);
  };

  if (fetching) return 'Loading...';
  if (error) return 'Something Bad Happened';
  return (
    <>
      <h1>{data.findMyClass.name}</h1>

      {started
        && (
        <>
          Class has started, you can direct your students to:
          {' '}
          {window.location.origin}
          /
          {data.findMyClass.code}
        </>
        )}

      {!started
      && <button type="button" onClick={() => startClass()}>Start class</button>}

      <ul>
        {(data.findMyClass.Buttons || [])
          .map(({ id, color }) => (
            <MyButton
              id={id}
              classId={data.findMyClass.id}
              currentColor={color}
              key={id}
            />
          ))}
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
