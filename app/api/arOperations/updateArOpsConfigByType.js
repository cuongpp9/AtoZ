// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';

export default data => {
  const input = parseToMutationRequest(data, [
    'arOpsConfigType',
    'index',
    'type',
    'reasonCode',
  ]);

  const updateArOpsConfigByType = `updateArOpsConfigByType(input: ${input})`;
  return gql`
  mutation {
    ${updateArOpsConfigByType} {
      arOpsConfigType
      reasonCodes {
        index
        taxCode
        gLAccount
        type
        reasonCode
      }
    }
  }
`;
};
