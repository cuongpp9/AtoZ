// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import createAgentNS from './constants/createAgentNS';
export default data => {
  const dataCreate = parseToMutationRequest(data, createAgentNS);
  const createCollectionAgent = `createCollectionAgent(input: ${dataCreate})`;
  return gql`
  mutation {
    ${createCollectionAgent} {
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
