import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SimpleInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value || '' });
    }
  }
  render() {
    const { label } = this.props;
    return (
      <div className="form-group row">
        <label htmlFor={label} className="col-sm-4 col-form-label">
          {label}
        </label>
        <div className="col-sm-8">
          <input
            readOnly
            type="text"
            className="form-control-plaintext"
            id={label}
            value={this.state.value}
          />
        </div>
      </div>
    );
  }
}

SimpleInfo.propTypes = {
  value: PropTypes.any,
  label: PropTypes.string,
};

export default SimpleInfo;
