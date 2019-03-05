import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
class DynamicSelectField extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
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

  handleBlur = () => this.props.setFieldTouched(this.props.name, true);

  render() {
    const { selectedOption } = this.state;
    const {
      name,
      options,
      placeholder,
      required,
      onChange,
      disabled,
      isClearable,
      defaultValue,
      valueSelected,
    } = this.props;
    if(disabled) {
        return <p> {(valueSelected && valueSelected.label)||defaultValue} </p>
    }
    return (
      <Select
        name={name}
        value={selectedOption}
        onChange={onChange || this.handleChange}
        handleBlur={this.handleBlur}
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
       
      />
    );
  }
}

DynamicSelectField.propTypes = {
  name: PropTypes.string,
  defaultValue:PropTypes.string,
  options: PropTypes.array,
  valueSelected: PropTypes.object,
  onChange: PropTypes.func,
  setFieldTouched: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  getValue: PropTypes.func,
  isResetVal: PropTypes.bool,
  disabled: PropTypes.bool,
  isClearable: PropTypes.bool,
};

DynamicSelectField.defaultProps = {
  valueSelected: null,
  disabled: false,
  isClearable: true,
  defaultValue: 'No value',
};

export default DynamicSelectField;
