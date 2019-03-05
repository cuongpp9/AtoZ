import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class DynamicInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modify: false,
      value: props.value,
    };
    this.inputRef = React.createRef();
  }

  componentWillReceiveProps(props) {
    if (props.value !== this.state.value) {
      this.setState({
        value: props.value,
      });
    }
  }

  onChange = evt => {
    this.setState({ value: evt.target.value });

    const { onUpdateValue, name, index } = this.props;
    onUpdateValue(index, name, evt.target.value);
  };

  onDoubleClickTD = () => {
    this.setState({ modify: true });
    setTimeout(() => {
      this.inputRef.current.focus();
    }, 250);
  };

  renderContent() {
    const { modify, value } = this.state;
    return (
      <td onDoubleClick={this.onDoubleClickTD}>
        <div
          className={classnames('', {
            'field-none': modify,
          })}
        >
          {value}
        </div>
        <div
          className={classnames('form', {
            'field-none': !modify,
          })}
        >
          <input
            type={this.props.type}
            value={value}
            onChange={this.onChange}
            onBlur={() => this.setState({ modify: false })}
            ref={this.inputRef}
          />
        </div>
      </td>
    );
  }

  render() {
    return this.renderContent();
  }
}

DynamicInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.any,
  onUpdateValue: PropTypes.func,
  name: PropTypes.string,
  index: PropTypes.number,
};

DynamicInput.defaultProps = {
  type: 'text',
};

export default DynamicInput;
