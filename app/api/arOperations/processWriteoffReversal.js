// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import reversedWriteOffNS from './constants/reversedWriteOffNS';

export default data => {
  const dataCreate = parseToMutationRequest(data, reversedWriteOffNS);
  const processWriteoffReversal = `processWriteoffReversal(input: ${dataCreate})`;

  return gql`
  mutation {
    ${processWriteoffReversal} {
      id
    }
  }
`;
};
