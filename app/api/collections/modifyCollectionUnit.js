// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';

export default data => {
  const dataCreate = parseToMutationRequest(data, ['status']);
  const modifyCollectionUnit = `modifyCollectionUnit(input: ${dataCreate})`;
  return gql`
  mutation {
    ${modifyCollectionUnit} {
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
    }
  }
`;
};
