// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import mutationSchedule from './constants/mutationSchedule';
export default data => {
  const dataCreate = parseToMutationRequest(data, mutationSchedule);
  const modifyCollectionSchedule = `modifyCollectionSchedule(input: ${dataCreate})`;
  return gql`
  mutation {
    ${modifyCollectionSchedule} {
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
