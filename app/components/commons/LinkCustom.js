import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class LinkCustom extends React.Component {
  componentDidMount() {}

  render() {
    const { isActive, disabled, ...rest } = this.props;
    return (
      <Link
        className={classNames('nav-link', {
          active: isActive,
          'disabled-link': disabled,
        })}
        {...rest}
      >
        {this.props.children}
      </Link>
    );
  }
}

LinkCustom.propTypes = {
  to: PropTypes.string,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  isActive: PropTypes.bool,
};

export default LinkCustom;
