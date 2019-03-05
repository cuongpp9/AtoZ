// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';

export default data => {
  const dataCreate = parseToMutationRequest(data, ['status']);
  const createCollectionUnit = `createCollectionUnit(input: ${dataCreate})`;
  return gql`
  mutation {
    ${createCollectionUnit} {
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
