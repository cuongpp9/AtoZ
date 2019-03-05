import React from 'react';
import PropTypes from 'prop-types';

const InputValidate = props => (
  <div
    className={`form__form-group-input-wrap ${
      props.placeholder && !props.value
        ? 'form__form wrap--error-above form-require'
        : ''
    }`}
  >
    <input {...props} />
  </div>
);

InputValidate.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.any,
};

export default InputValidate;
