import gql from 'graphql-tag';

export default ({ id, status }) => {
  const updateBundleStatus = `updateBundleStatus(input: { id: "${id}", status: ${status}})`;
  return gql`
  mutation {
    ${updateBundleStatus} {
      id
      status
    }
  }
`;
};
