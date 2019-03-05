import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import packageNS from './constants/packageNS';

export default data => {
  const dataCreate = parseToMutationRequest(data, packageNS);
  const createPackage = `createPackage(input: ${dataCreate})`;
  return gql`
  mutation {
    ${createPackage} {
      id
    }
  }
`;
};
