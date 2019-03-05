import gql from 'graphql-tag';

export default id => {
  const getCollectionUnitsById = `getCollectionUnitsById(input: {id: "${id}"})`;
  return gql`
    query {
      ${getCollectionUnitsById} {
        id
        userId
        accountId
        invoiceId
        invoiceDate
        dueDate
        lastActionDate
        notes
        closeDate
        daysInCollection
        status
        unitActionList {
          index
          description
          action
          date
        }
      }
    }
  `;
};
