import React from 'react';
import PropTypes from 'prop-types';

import { SideBar } from 'components/UserManagement';
import RolesIndex from './RolesIndex';
import RoleGroupsIndex from './RoleGroupsIndex';
import UserIndex from './UserIndex';
class Roles extends React.PureComponent {
  renderContent(childRoute) {
    switch (childRoute) {
      case 'roles':
        return <RolesIndex />;
      case 'role-groups':
        return <RoleGroupsIndex />;
      case 'users':
        return <UserIndex />;
      default:
        return <div />;
    }
  }
  render() {
    const {
      match: {
        params: { childRoute },
      },
    } = this.props;

    return (
      <div className="user-management">
        <SideBar />
        {this.renderContent(childRoute)}
      </div>
    );
  }
}

Roles.propTypes = {
  match: PropTypes.object,
};

export default Roles;
