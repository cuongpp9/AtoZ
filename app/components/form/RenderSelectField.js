import React, { PureComponent } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

class SelectField extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange = selectedOption => {
    this.props.onChange(selectedOption);
  };

  handleBlur = () => this.props.setFieldTouched(this.props.name, true);

  render() {
    const { value, name, placeholder, options, meta, isDisabled } = this.props;
    const newValue = value && value.size ? value.toJS() : value;

    return (
      <Select
        name={name}
        value={newValue}
        onChange={this.handleChange}
        handleBlur={this.handleBlur}
        options={options}
        isClearable
        className={`form__form-group-select ${
          (meta.error && !newValue) ? 'active-error' : value ? 'active-success' : ''
        }`}
        placeholder={placeholder}
        inputProps={{
          autoComplete: 'off',
          autoCorrect: 'off',
          spellCheck: 'off',
        }}
        isDisabled={isDisabled}
        // menuIsOpen
      />
    );
  }
}

SelectField.propTypes = {
  value: PropTypes.any,
  meta: PropTypes.object,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  setFieldTouched: PropTypes.func,
  options: PropTypes.array,
  isDisabled: PropTypes.bool,
};

const renderSelectField = props => {
  return (
    <div className="form__form-group-input-wrap">
      <SelectField
        {...props.input}
        options={props.options}
        placeholder={props.meta.error || props.placeholder}
        meta={props.meta}
        isDisabled={props.isDisabled}
      />
    </div>
  );
};

renderSelectField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
};

renderSelectField.defaultProps = {
  isDisabled: false,
}

export default renderSelectField;
