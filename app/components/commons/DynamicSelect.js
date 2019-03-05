import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Select from 'react-select';

class DynamicSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modify: false,
      value: props.value,
    };

    this.selectRef = React.createRef();
  }

  componentWillReceiveProps(props) {
    if (props.value !== this.state.value) {
      this.setState({
        value: props.value,
      });
    }
  }

  onChange = val => {
    this.setState({ value: val });

    const { onUpdateValue, name, index } = this.props;
    onUpdateValue(index, name, val.value);
  };

  onBlur = () => {
    this.setState({ modify: false });
  };

  onDoubleClickTd = () => {
    this.setState({ modify: true });
    setTimeout(() => {
      this.selectRef.current.focus();
    }, 250);
  };

  renderContent() {
    const { modify, value } = this.state;
    const { options } = this.props;

    return (
      <td onDoubleClick={this.onDoubleClickTd}>
        <div
          className={classnames('', {
            'field-none': modify,
          })}
        >
          {value.value}
        </div>
        <Select
          value={value}
          onChange={this.onChange}
          options={options}
          isClearable={false}
          onBlur={this.onBlur}
          className={classnames('form__form-group-select', {
            'field-none': !modify,
          })}
          ref={this.selectRef}
        />
      </td>
    );
  }

  render() {
    return this.renderContent();
  }
}

DynamicSelect.propTypes = {
  value: PropTypes.object,
  onUpdateValue: PropTypes.func,
  name: PropTypes.string,
  index: PropTypes.number,
  options: PropTypes.array,
};

export default DynamicSelect;
