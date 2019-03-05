import React from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
const RenderFieldFormat = ({
  input,
  placeholder,
  type,
  meta: { error },
  mask,
  disabled,
}) => (
  <div
    className={`form__form-group-input-wrap ${
      error
        ? 'form__form - group - input - wrap--error-above form-require'
        : input.value
          ? 'form-success'
          : ''
    }`}
  >
    <MaskedInput
      {...input}
      placeholder={error || placeholder}
      type={type}
      mask={mask}
      disabled={disabled}
    />
  </div>
);

RenderFieldFormat.propTypes = {
  input: PropTypes.object,
  lable: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  mask: PropTypes.array,
  disabled: PropTypes.bool,
};
export default RenderFieldFormat;
