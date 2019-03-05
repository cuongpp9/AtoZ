// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import disputeNS from './constants/disputeNS';

export default data => {
  const dataCreate = parseToMutationRequest(data, disputeNS);
  const processDispute = `processDispute(input: ${dataCreate})`;
  return gql`
  mutation {
    ${processDispute} {
      id
    }
  }
`;
};
