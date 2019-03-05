// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import customerVNS from './constants/customerVNS';

export default data => {
  const dataCreate = parseToMutationRequest(data, customerVNS);
  const createAccount = `createAccount(input: ${dataCreate})`;
  return gql`
  mutation {
    ${createAccount} {
      id
    }
  }
`;
};
