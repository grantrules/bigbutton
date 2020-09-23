import React from 'react';
import PropTypes from 'prop-types';

function TextInput({
  type, label, placeholder, value, onChange, id, required,
}) {
  return (
    <>
      <label htmlFor={id}>
        {label}
      </label>
      <input type={type} placeholder={placeholder} value={value} id={id} onChange={onChange} required={required && 'required'} />
    </>

  );
}

TextInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
};

TextInput.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  value: '',
  id: '',
  required: false,
  onChange: () => {},
};

export default TextInput;
