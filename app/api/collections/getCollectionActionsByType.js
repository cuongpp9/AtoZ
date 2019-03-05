import gql from 'graphql-tag';

export default ({ type }) => {
  const getCollectionActionsByType = `getCollectionActionsByType(input: {type:${type}})`;
  return gql`
    query {
      ${getCollectionActionsByType} {
        id
        type
        actionList {
          index
          description
          action
        }
      }
    }
  `;
};
