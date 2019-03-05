import gql from 'graphql-tag';

export default ({ id, status }) => {
  const updateStatusItem = `updateItemStatus(input: { id: "${id}", status: ${status}})`;
  return gql`
  mutation {
    ${updateStatusItem} {
      id
      status
    }
  }
`;
};
