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

class NavCustomer extends Component {
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
    if (pathname.includes('/customers') || pathname.includes('/orders')) {
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
          Customer Hub
          <DownIcon />
        </DropdownToggle>
        <DropdownMenu className="topbar__nav-dropdown-menu dropdown__menu">
          <DropdownItem
            className="topbar__link"
            onClick={evt => this.handleClickItem(evt, '/customers')}
          >
            <p className="topbar__link-title p-l">Customer Management</p>
          </DropdownItem>
          <DropdownItem
            className="topbar__link"
            onClick={evt => this.handleClickItem(evt, '/orders')}
          >
            <p className="topbar__link-title p-l">Order Management</p>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

NavCustomer.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default compose(withRouter)(NavCustomer);
