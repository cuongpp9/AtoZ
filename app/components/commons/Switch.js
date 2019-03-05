import React from 'react';
import PropTypes from 'prop-types';

function Switch({ checked, onChangeToggle, disabled, idForm }) {
  return (
    <label htmlFor={idForm} className="i-switch i-switch-md m-t-xs m-r">
      <input
        id={idForm}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={() => onChangeToggle()}
      />
      <i />
    </label>
  );
}

Switch.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChangeToggle: PropTypes.func,
  idForm: PropTypes.string,
};

export default Switch;
