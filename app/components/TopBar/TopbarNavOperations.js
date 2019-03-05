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

class NavOperations extends Component {
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
    if (pathname.includes('/dashboard') || pathname.includes('/reports')) {
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
          Operations Hub
          <DownIcon />
        </DropdownToggle>
        <DropdownMenu className="topbar__nav-dropdown-menu dropdown__menu">
        <DropdownItem
            className="topbar__link"
            onClick={evt => this.handleClickItem(evt, '/user-management')}
          >
            <p className="topbar__link-title p-l">User Management</p>
          </DropdownItem>
          <DropdownItem
            className="topbar__link"
            onClick={evt => this.handleClickItem(evt, '/jobs-management')}
          >
            <p className="topbar__link-title p-l">Jobs Management</p>
          </DropdownItem>
          <DropdownItem
            className="topbar__link"
            onClick={evt => this.handleClickItem(evt, '/correspondence')}
          >
            <p className="topbar__link-title p-l">Correspondence</p>
          </DropdownItem>
          <DropdownItem
            className="topbar__link"
            onClick={evt => this.handleClickItem(evt, '/reports')}
          >
            <p className="topbar__link-title p-l">Reports</p>
          </DropdownItem>
          <DropdownItem
            className="topbar__link"
            onClick={evt => this.handleClickItem(evt, '/dashboard')}
          >
            <p className="topbar__link-title p-l">Dashboard</p>
          </DropdownItem>
          <DropdownItem
            className="topbar__link"
            onClick={evt => this.handleClickItem(evt, '/tenant-management')}
          >
            <p className="topbar__link-title p-l">Tenant Management</p>
          </DropdownItem>
          
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

NavOperations.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default compose(withRouter)(NavOperations);
