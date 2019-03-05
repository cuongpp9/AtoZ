import gql from 'graphql-tag';

export default ({ id, reason, status }) => {
  const inputStr = reason
    ? `{ id: "${id}",reason: "${reason}", status: ${status}}`
    : `{ id: "${id}", status: ${status}}`;
  const updateOrderStatus = `updateOrderStatus(input: ${inputStr})`;
  return gql`
  mutation {
    ${updateOrderStatus} {
      id
      reason
      status
    }
  }
`;
};
