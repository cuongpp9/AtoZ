// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import adjustmentNS from './constants/adjustmentNS';

export default data => {
  const dataCreate = parseToMutationRequest(data, adjustmentNS);
  const processAdjustment = `processAdjustment(input: ${dataCreate})`;
  return gql`
  mutation {
    ${processAdjustment} {
      id
    }
  }
`;
};
