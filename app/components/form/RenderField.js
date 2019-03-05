import React from 'react';
import PropTypes from 'prop-types';
const RenderField = ({
  input,
  textarea,
  placeholder,
  type,
  meta: { error },
  disabled,
}) => (
  <div
    className={`form__form-group-input-wrap ${
      error && !input.value
        ? 'form__form - group - input - wrap--error-above form-require'
        : input.value
          ? 'form-success'
          : ''
    }`}
  >
    {textarea ? (
      <textarea
        {...input}
        placeholder={error || placeholder}
        type={type}
        disabled={disabled}
      />
    ) : (
      <input
        {...input}
        placeholder={error || placeholder}
        type={type}
        disabled={disabled}
      />
    )}
  </div>
);

RenderField.propTypes = {
  input: PropTypes.object,
  textarea: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
};
export default RenderField;
