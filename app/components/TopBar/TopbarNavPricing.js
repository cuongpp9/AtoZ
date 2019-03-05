import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import _ from 'lodash';
import {
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
} from 'reactstrap';

class NavPricing extends Component {
  state = {
    isActive: false,
  };
  handleClickItem = (evt, route) => {
    evt.preventDefault();
    this.props.history.push(route);
  };

  componentDidMount() {
    this.isActive(this.props.location.pathname);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.isActive(nextProps.location.pathname);
    }
  }
  isActive = pathname => {
    const pathRoot = _.split(pathname, '/', 2);
    if (
      pathRoot[1] === 'pricing-management' ||
      pathRoot[1] === 'bundle-management'
    ) {
      this.setState({ isActive: true });
    } else {
      this.setState({ isActive: false });
    }
  };

  render() {
    const { isActive } = this.state;
    return (
      <UncontrolledDropdown
        className={`topbar__nav-dropdown ${
          isActive ? 'topbar__nav-dropdown--active' : ''
        }`}
      >
        <DropdownToggle className="topbar__nav-dropdown-toggle">
          Pricing Hub
          <DownIcon />
        </DropdownToggle>
        <DropdownMenu className="topbar__nav-dropdown-menu dropdown__menu">
          <DropdownItem
            className="topbar__link"
            onClick={evt => this.handleClickItem(evt, '/pricing-management')}
          >
            <p className="topbar__link-title p-l">Pricing Management</p>
          </DropdownItem>
          <DropdownItem
            className="topbar__link"
            onClick={evt => this.handleClickItem(evt, '/bundle-management')}
          >
            <p className="topbar__link-title p-l">Bundle Management</p>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

NavPricing.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default compose(withRouter)(NavPricing);
