import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
class SelectField extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      selectedOption: props.valueSelected,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isResetVal !== nextProps.isResetVal &&
      nextProps.isResetVal
    ) {
      this.setState({ selectedOption: null });
    }

    if (this.props.valueSelected !== nextProps.valueSelected) {
      this.setState({
        selectedOption: nextProps.valueSelected,
      });
    }
  }

  handleChange = selectedOption => {
    const { getValue } = this.props;
    this.setState({ selectedOption });
    if (getValue) {
      if (selectedOption) {
        getValue(selectedOption.value);
      } else {
        getValue('');
      }
    }
  };

  render() {
    const { selectedOption } = this.state;
    const {
      name,
      options,
      placeholder,
      required,
      onChange,
      isDisabled,
      isClearable,
      onBlur,
    } = this.props;
    return (
      <Select
        name={name}
        value={selectedOption}
        onChange={onChange || this.handleChange}
        options={options}
        isClearable={isClearable}
        className={`form__form-group-select ${
          required && !selectedOption
            ? 'active-error'
            : selectedOption
              ? 'active-success'
              : ''
        }`}
        placeholder={placeholder}
        isDisabled={isDisabled}
        onBlur={onBlur}
      />
    );
  }
}

SelectField.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  valueSelected: PropTypes.object,
  onChange: PropTypes.func,
  setFieldTouched: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  getValue: PropTypes.func,
  isResetVal: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  onBlur: PropTypes.func,
};

SelectField.defaultProps = {
  valueSelected: null,
  isDisabled: false,
  isClearable: true,
  onBlur: () => {},
};

export default SelectField;
