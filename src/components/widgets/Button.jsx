import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useMutation } from 'urql';

function DeleteButton({ id, classId, onDelete }) {
  const DELETE_BUTTON_MUTATION = `mutation DeleteButton($buttonId: Int!, $classId: String!) {
    deleteButton(buttonId: $buttonId, classId: $classId)
  }`;
  const [/* createClassResult */, deleteButton] = useMutation(DELETE_BUTTON_MUTATION);

  const click = () => {
    deleteButton({ buttonId: id, classId }).then(() => onDelete());
  };
  return (<button type="button" onClick={click}>delete</button>);
}

DeleteButton.propTypes = {
  id: PropTypes.number,
  classId: PropTypes.string,
  onDelete: PropTypes.func,
};

DeleteButton.defaultProps = {
  id: -1,
  classId: '',
  onDelete: () => {},
};

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
  id: PropTypes.number,
  color: PropTypes.string,
};
Button.defaultProps = {
  id: -1,
  color: '',
};

function MyButton({ id, currentColor, classId }) {
  const [deleted, setDeleted] = useState(false);
  const [color, setColor] = useState(currentColor);
  if (deleted) {
    return (<></>);
  }
  return (
    <>
      <Button id={id} color={color} />
      <DeleteButton id={id} classId={classId} onDelete={() => setDeleted(true)} />
      <UpdateButtonColor classId={classId} buttonId={id} onUpdate={setColor} />
    </>
  );
}

MyButton.propTypes = {
  id: PropTypes.number,
  currentColor: PropTypes.string,
  classId: PropTypes.string,
};

MyButton.defaultProps = {
  id: -1,
  currentColor: 'red',
  classId: '',
};

function UpdateButtonColor({ classId, buttonId, onUpdate }) {
  const UPDATE_COLOR_MUTATION = `mutation UpdateColor($color: String!, $classId: String!, $buttonId: Int!) {
    updateColor(color: $color, classId: $classId, buttonId: $buttonId)
  }`;
  const [/* createClassResult */, updateColor] = useMutation(UPDATE_COLOR_MUTATION);

  const setColor = (color) => updateColor({ color, classId, buttonId }).then(() => onUpdate(color));

  return (
    <select onChange={(e) => setColor(e.target.value)}>
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
    </select>
  );
}

UpdateButtonColor.propTypes = {
  classId: PropTypes.string,
  buttonId: PropTypes.number,
  onUpdate: PropTypes.func,
};
UpdateButtonColor.defaultProps = {
  buttonId: -1,
  classId: '',
  onUpdate: () => {},
};

export {
  Button, DeleteButton, MyButton, UpdateButtonColor,
};
