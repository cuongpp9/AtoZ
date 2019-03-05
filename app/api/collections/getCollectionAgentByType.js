import gql from 'graphql-tag';

export default ({ type }) => {
  const getCollectionAgentByType = `getCollectionAgentByType(input: {type:${type}})`;
  return gql`
    query {
      ${getCollectionAgentByType} {
        id
        type
        collectionAgents {
          index
          userId
          firstName
          lastName
        }
      }
    }
  `;
};
