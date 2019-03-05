import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import dependencyNS from './constants/dependencyNS';

export default data => {
  const dataCreate = parseToMutationRequest(data, dependencyNS);
  const createDependency = `createDependency(input: ${dataCreate})`;
  return gql`
  mutation {
    ${createDependency} {
      id
    }
  }
`;
};
