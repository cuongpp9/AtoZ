import React from 'react';
import PropTypes from 'prop-types';

const delay = 200;

class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.event = false;
    this.handerClick = null;
  }
  onClick = () => {
    if (this.event) {
      if (this.handerClick) {
        clearTimeout(this.handerClick);
      }
      this.event = false;

      this.props.onDoubleClick();
    } else {
      this.event = true;
      this.handerClick = setTimeout(() => {
        if (this.handerClick) {
          clearTimeout(this.handerClick);
        }

        this.props.onClick();
        this.event = false;
      }, delay);
    }
  };
  componentWillUnmount = () => {
    if (this.handerClick) {
      clearTimeout(this.handerClick);
    }
  };
  render() {
    const { children } = this.props;
    return (
      <tr {...this.props} onClick={this.onClick} onDoubleClick={() => {}}>
        {children}
      </tr>
    );
  }
}

TableRow.propTypes = {
  children: PropTypes.any,
  onDoubleClick: PropTypes.func,
  onClick: PropTypes.func,
};

TableRow.defaultProps = {
  children: null,
  onDoubleClick: () => {},
  onClick: () => {},
};

export default TableRow;
