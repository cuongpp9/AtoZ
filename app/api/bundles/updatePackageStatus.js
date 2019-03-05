import gql from 'graphql-tag';

export default ({ id, status }) => {
  const updatePackageStatus = `updatePackageStatus(input: { id: "${id}", status: ${status}})`;
  return gql`
  mutation {
    ${updatePackageStatus} {
      id
      status
    }
  }
`;
};
