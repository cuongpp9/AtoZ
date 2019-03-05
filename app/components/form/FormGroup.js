import React from 'react';
import PropTypes from 'prop-types';
const FormGroup = ({ children, title, className, iconLabel }) => (
  <div className={`form__form-group ${className || ''}`}>
    {title && (
      <label className="form__form-group-label">
        {title} {iconLabel}
      </label>
    )}
    <div
      className={`form__form-group-field ${
        title ? '' : 'form__form-group-field-style'
      }`}
    >
      {children}
    </div>
  </div>
);

FormGroup.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  className: PropTypes.string,
  iconLabel: PropTypes.any,
};

FormGroup.defaultProps = {
  iconLabel: null,
};

export default FormGroup;
