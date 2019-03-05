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
import { RouteManager } from 'constantsApp';

class NavAR extends Component {
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
    if (
      pathname.includes('/payments') ||
      pathname.includes('/collections') ||
      pathname.includes(RouteManager.arOperations.mainRoute)
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
          AR Hub
          <DownIcon />
        </DropdownToggle>
        <DropdownMenu className="topbar__nav-dropdown-menu dropdown__menu">
          <DropdownItem
            className="topbar__link"
            onClick={evt => this.handleClickItem(evt, '/payments')}
          >
            <p className="topbar__link-title p-l">Payments</p>
          </DropdownItem>
          <DropdownItem
            className="topbar__link"
            onClick={evt => this.handleClickItem(evt, '/collections')}
          >
            <p className="topbar__link-title p-l">Collections</p>
          </DropdownItem>
          <DropdownItem
            className="topbar__link"
            onClick={evt => this.handleClickItem(evt, RouteManager.arOperations.mainRoute)}
          >
            <p className="topbar__link-title p-l">AR Operations</p>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

NavAR.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default compose(withRouter)(NavAR);
