// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import writeOffNS from './constants/writeOffNS';

export default data => {
  const dataCreate = parseToMutationRequest(data, writeOffNS);
  const processWriteoff = `processWriteoff(input: ${dataCreate})`;
  return gql`
  mutation {
    ${processWriteoff} {
      id
    }
  }
`;
};
