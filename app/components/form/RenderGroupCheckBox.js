import React, { PureComponent } from 'react';
import CheckIcon from 'mdi-react/CheckIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import PropTypes from 'prop-types';

class CheckBoxGroupField extends PureComponent {
  componentDidMount() {
    if (this.props.defaultChecked) {
      this.props.onChange(this.props.checkBoxValue);
    }
  }

  onChange = () => {
    this.props.onChange(this.props.checkBoxValue);
  };

  render() {
    const disabled = this.props.disabled;

    return (
      <label
        className={`checkbox-btn${disabled ? ' disabled' : ''}${
          this.props.class ? ` checkbox-btn--${this.props.class}` : ''
        }`}
      >
        <input
          className="checkbox-btn__checkbox"
          type="checkbox"
          value={this.props.value}
          name={this.props.name}
          onChange={this.onChange}
          checked={this.props.value === this.props.checkBoxValue}
          disabled={disabled}
        />
        <span
          className="checkbox-btn__checkbox-custom"
          style={
            this.props.color
              ? { background: this.props.color, borderColor: this.props.color }
              : {}
          }
        >
          <CheckIcon />
        </span>
        {this.props.class === 'button' ? (
          <span className="checkbox-btn__label-svg">
            <CheckIcon className="checkbox-btn__label-check" />
            <CloseIcon className="checkbox-btn__label-uncheck" />
          </span>
        ) : (
          ''
        )}
        <span className="checkbox-btn__label">{this.props.label}</span>
      </label>
    );
  }
}

const renderCheckBoxGroupField = props => (
  <CheckBoxGroupField
    {...props.input}
    label={props.label}
    defaultChecked={props.defaultChecked}
    disabled={props.disabled}
    checkBoxValue={props.checkBoxValue}
    class={props.class}
    color={props.color}
  />
);

renderCheckBoxGroupField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  checkBoxValue: PropTypes.string,
  class: PropTypes.string,
  color: PropTypes.string,
};

export default renderCheckBoxGroupField;
