import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useMutation } from 'urql';

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

DeleteStudent.propTypes = {
  studentId: PropTypes.string,
  classId: PropTypes.string,
  onDelete: PropTypes.func,
};

DeleteStudent.defaultProps = {
  studentId: '',
  classId: '',
  onDelete: () => {},
};

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
  children: PropTypes.node,
};
Student.defaultProps = {
  name: '',
  children: [],
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

MyStudent.propTypes = {
  id: PropTypes.string,
  classId: PropTypes.string,
  name: PropTypes.string,
};

MyStudent.defaultProps = {
  id: '',
  classId: '',
  name: '',
};

export { MyStudent, Student, DeleteStudent };
