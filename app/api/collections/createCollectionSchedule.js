// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import mutationSchedule from './constants/mutationSchedule';
export default data => {
  const dataCreate = parseToMutationRequest(data, mutationSchedule);
  const createCollectionSchedule = `createCollectionSchedule(input: ${dataCreate})`;
  return gql`
  mutation {
    ${createCollectionSchedule} {
      id
      type
      collectionSchedule {
        index
        offsetdays
        description
        action
      }
    }
  }
`;
};
