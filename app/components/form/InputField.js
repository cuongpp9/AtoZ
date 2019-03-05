import React from 'react';
import PropTypes from 'prop-types';

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = e => {
    const { getValue } = this.props;
    getValue(e.target.value);
  };

  render() {
    const { name, value, placeholder, required, disabled } = this.props;
    return (
      <div
        className={`form__form-group-input-wrap ${
          required && !value
            ? 'form__form wrap--error-above form-require'
            : value
              ? 'form-success'
              : ''
        }`}
      >
        <input
          name={name}
          value={value}
          type="text"
          placeholder={placeholder}
          onChange={this.handleChange}
          disabled={disabled}
        />
      </div>
    );
  }
}

InputField.defaultProps = {
  disabled: false,
};

InputField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  getValue: PropTypes.func,
  disabled: PropTypes.bool,
};
export default InputField;
