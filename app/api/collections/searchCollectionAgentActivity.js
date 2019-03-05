import gql from 'graphql-tag';

export default ({ page, size }) => {
  const searchCollectionAgent = `searchCollectionAgentActivity(page: ${page}, size: ${size})`;
  return gql`
    query {
      ${searchCollectionAgent} {
        index
        countOfAccounts
        averageAgeInCollection
        countOfAccountsResolved
        userId
        firstName
        lastName
      }
    }
  `;
};
