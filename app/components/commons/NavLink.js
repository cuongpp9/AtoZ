import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class NavLink extends React.Component {
  componentDidMount() {}

  render() {
    const root = this.props.to;
    const pathRoot = this.context.router.route.location.pathname;
    const isActive = root === pathRoot;
    return (
      <Link
        className={classNames('nav-link', {
          active: isActive,
          'disabled-link': this.props.disabled,
        })}
        {...this.props}
      >
        {this.props.children}
      </Link>
    );
  }
}

NavLink.contextTypes = {
  router: PropTypes.object,
};

NavLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.any,
  disabled: PropTypes.bool,
};

export default NavLink;
