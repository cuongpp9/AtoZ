// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import modifyAccountNS from './constants/modifyAccountNS';
export default data => {
  const dataCreate = parseToMutationRequest(data, modifyAccountNS);
  const modifyCollectionAction = `modifyCollectionAction(input: ${dataCreate})`;
  return gql`
  mutation {
    ${modifyCollectionAction} {
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
