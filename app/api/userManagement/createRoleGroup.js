// import React from 'react';
import gql from 'graphql-tag';
import { parseToUserManagementMutationRequest } from 'utils/utils';

export default data => {
  const dataCreate = parseToUserManagementMutationRequest(
    data,
    ['status'],
    ['index'],
  );
  const createRoleGroup = `createRoleGroup(input: ${dataCreate})`;
  return gql`
  mutation {
    ${createRoleGroup} {
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
