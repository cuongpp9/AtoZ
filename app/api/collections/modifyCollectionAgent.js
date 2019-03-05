// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import modifyAgentNS from './constants/modifyAgentNS';
export default data => {
  const dataCreate = parseToMutationRequest(data, modifyAgentNS);
  const modifyCollectionAgent = `modifyCollectionAgent(input: ${dataCreate})`;
  return gql`
  mutation {
    ${modifyCollectionAgent} {
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
