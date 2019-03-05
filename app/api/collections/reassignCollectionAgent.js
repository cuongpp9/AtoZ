// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';

export default data => {
  const dataCreate = parseToMutationRequest(data, []);
  const CollectionReassignToAgent = `CollectionReassignToAgent(input: ${dataCreate})`;
  return gql`
  mutation {
    ${CollectionReassignToAgent} {
      userId
      accountId
      invoiceId
      collectionUnitId
    }
  }
`;
};
