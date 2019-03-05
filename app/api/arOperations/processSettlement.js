// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import settlementNS from './constants/settlementNS';

export default data => {
  const dataCreate = parseToMutationRequest(data, settlementNS);
  const processSettlement = `processSettlement(input: ${dataCreate})`;
  return gql`
  mutation {
    ${processSettlement} {
      id
    }
  }
`;
};
