import React from 'react';
import PropTypes from 'prop-types';

import { SideBar } from 'components/UserManagement';
import RoleDetails from './RoleDetails';
import NewRoles from './NewRoles';
import RoleGroupsDetail from './RoleGroupsDetail';
import NewRoleGroup from './NewRoleGroups';
import UserDetail from './UserDetail';
class Roles extends React.PureComponent {
  renderContent(childRoute, id) {
    switch (childRoute) {
      case 'roles':
        return <RoleDetails id={id} />;
      case 'new-roles':
        return <NewRoles id={id} />;
      case 'role-groups':
        return <RoleGroupsDetail id={id} />;
      case 'new-role-groups':
        return <NewRoleGroup id={id} />;
      case 'user':
        return <UserDetail id={id} />;
      default:
        return <div />;
    }
  }
  render() {
    const {
      match: {
        params: { childRoute, id },
      },
    } = this.props;

    return (
      <div className="user-management">
        <SideBar />
        {this.renderContent(childRoute, id)}
      </div>
    );
  }
}

Roles.propTypes = {
  match: PropTypes.object,
};

export default Roles;
