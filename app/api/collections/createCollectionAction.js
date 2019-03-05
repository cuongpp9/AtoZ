// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import createAccountNS from './constants/createAccountNS';
export default data => {
  const dataCreate = parseToMutationRequest(data, createAccountNS);
  const createCollectionAction = `createCollectionAction(input: ${dataCreate})`;
  return gql`
  mutation {
    ${createCollectionAction} {
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
