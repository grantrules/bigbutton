import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useQuery, useMutation } from 'urql';
import { useParams } from 'react-router';

import { MyButton } from '../widgets/Button';
import { MyStudent } from '../widgets/Student';
import { useI18N } from '../context/I18NProvider';
import AudioRecorder from '../widgets/AudioRecorder';

const HOMEPAGE_QUERY = 'query ($classId: String!) { findMyClass(classId: $classId) { id, name, code, Students { id, name }, Buttons { id, color } } }';

function CreateStudent({ classId, callback }) {
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
    callback();
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
  callback: PropTypes.func,
};
CreateStudent.defaultProps = {
  classId: '',
  callback: () => {},
};

function CreateButton({ classId, callback }) {
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
    callback();
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
  callback: PropTypes.func,
};
CreateButton.defaultProps = {
  classId: '',
  callback: () => {},
};

function ClassPage() {
  const { classId } = useParams();

  const { t } = useI18N();

  return (
    <>
      <h1>{t`Class`}</h1>
      <div>{classId}</div>

      <MyComponent classId={classId} />
    </>
  );
}

function MyComponent({ classId }) {
  const { t } = useI18N();

  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: HOMEPAGE_QUERY, variables: { classId },
  });

  const [started, setStarted] = useState(false);

  const startClass = () => {
    setStarted(true);
  };

  if (fetching) return t`Loading...`;
  if (error) return t`Something Bad Happened`;
  return (
    <>
      <h1>{data.findMyClass.name}</h1>

      <CreateStudent classId={classId} callback={() => reexecuteQuery()} />
      <CreateButton classId={classId} callback={() => reexecuteQuery()} />

      {started
        && (
        <>
          {t`Class has started, you can direct your students to:`}
          {' '}
          {window.location.origin}
          /
          {data.findMyClass.code}
        </>
        )}

      {!started
      && <button type="button" onClick={() => startClass()}>{t`Start class`}</button>}

      <ul>
        {(data.findMyClass.Buttons || [])
          .map(({ id, color }) => (
            <li key={id}>
              <MyButton
                id={id}
                classId={data.findMyClass.id}
                currentColor={color}
              />
              <AudioRecorder id={id} />
            </li>
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
  classId: PropTypes.string.isRequired,
};

export default ClassPage;
