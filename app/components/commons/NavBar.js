import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class NavBar extends React.Component {
  componentDidMount() {}

  render() {
    const root = this.props.to;
    const pathRoot = this.context.router.route.location.pathname;
    const isActive = pathRoot.includes(root);
    return (
      <ul className="nav-bar">
        <Link
          className={classNames('nav-link nav-bar-link', {
            active: isActive,
            'disabled-link': this.props.disabled,
          })}
          {...this.props}
        >
          {this.props.lable}
        </Link>
        {this.props.children}
      </ul>
    );
  }
}

NavBar.contextTypes = {
  router: PropTypes.object,
};

NavBar.propTypes = {
  to: PropTypes.string,
  children: PropTypes.any,
  lable: PropTypes.string,
  disabled: PropTypes.bool,
};

export default NavBar;
