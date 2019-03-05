import React from 'react';
import PropTypes from 'prop-types';

const TextareaValidate = props => (
  <div
    className={`form__form-group-input-wrap ${
      props.placeholder && !props.value
        ? 'form__form wrap--error-above form-require'
        : ''
    }`}
  >
    <textarea {...props} />
  </div>
);

TextareaValidate.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.any,
};

export default TextareaValidate;
