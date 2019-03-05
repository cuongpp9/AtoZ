// import React from 'react';
import gql from 'graphql-tag';
import { parseToUserManagementMutationRequest } from 'utils/utils';

export default data => {
  const dataCreate = parseToUserManagementMutationRequest(
    data,
    ['status'],
    ['index'],
  );
  const modifyRoleGroup = `modifyRoleGroup(input: ${dataCreate})`;
  return gql`
  mutation {
    ${modifyRoleGroup} {
      id
      name
      description
      type
      status
      roleGroupRoles {
        index
        roleId
      }
    }
  }
`;
};
