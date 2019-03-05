import React from 'react';
import PropTypes from 'prop-types';
const FormAbstract = ({ children, onSubmit }) => (
  <form className="form form--horizontal" onSubmit={onSubmit}>
    <div className="form__wrapper">{children}</div>
  </form>
);

FormAbstract.propTypes = {
  children: PropTypes.any,
  onSubmit: PropTypes.func,
};

FormAbstract.defaultProps = {
  onSubmit: () => {},
};

export default FormAbstract;
