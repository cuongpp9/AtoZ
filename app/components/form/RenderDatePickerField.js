import React, { PureComponent } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

class DatePickerField extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
    this.props.onChange(date);
  }

  render() {
    const { value, disabled } = this.props;
    const date = value ? moment(value) : null;
    return (
      <div className="date-picker">
        <DatePicker
          className="form__form-group-datepicker"
          popperPlacement="bottom-start"
          popperModifiers={{
            flip: {
              enabled: false,
            },
            preventOverflow: {
              enabled: true,
              escapeWithReference: false,
            },
          }}
          selected={this.state.startDate || date}
          onChange={this.handleChange}
          dateFormat="YYYY-MM-DD"
          placeholderText={this.props.placeholder}
          minDate={this.props.isMinDate ? moment() : null}
          autoComplete="off"
          isClearable
          disabled={disabled}
        />
      </div>
    );
  }
}
DatePickerField.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  isMinDate: PropTypes.bool,
  value: PropTypes.any,
  disabled: PropTypes.bool,
};
const renderDatePickerField = props => (
  <DatePickerField
    {...props.input}
    placeholder={props.placeholder}
    isMinDate={props.isMinDate}
    disabled={props.disabled}
  />
);

renderDatePickerField.propTypes = {
  input: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  isMinDate: PropTypes.bool,
  disabled: PropTypes.bool,
};

renderDatePickerField.defaultProps = {
  isMinDate: false,
  disabled: false,
};

export default renderDatePickerField;
