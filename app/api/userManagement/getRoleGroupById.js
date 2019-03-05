import gql from 'graphql-tag';

export default id => {
  const getRoleGroupById = `getRoleGroupById(input: {id: "${id}"})`;
  return gql`
    query {
      ${getRoleGroupById} {
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
