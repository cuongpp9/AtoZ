import gql from 'graphql-tag';

export default ({ id, status, reason }) => {
  const updateStatusAccount = `updateStatus(input: { id: "${id}", status: ${status}, reason: ${reason}})`;
  return gql`
  mutation {
    ${updateStatusAccount} {
      id
      status
      reason
    }
  }
`;
};
