import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import bundleNS from './constants/bundleNS';

export default data => {
  const dataCreate = parseToMutationRequest(data, bundleNS);
  const createBundle = `createBundle(input: ${dataCreate})`;
  return gql`
  mutation {
    ${createBundle} {
      id
    }
  }
`;
};
