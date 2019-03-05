import React from 'react';
import PropTypes from 'prop-types';
class DynamicInputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { disabled, value, required } = this.props;
    if (disabled) {
      return <p>{value}</p>;
    }
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
        <input {...this.props} />
      </div>
    );
  }
}

DynamicInputField.propTypes = {
  value: PropTypes.any,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};
export default DynamicInputField;
