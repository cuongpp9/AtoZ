import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import dependencyNS from './constants/dependencyNS';

export default data => {
  const dataCreate = parseToMutationRequest(data, dependencyNS);
  const modifyDependency = `modifyDependency(input: ${dataCreate})`;
  return gql`
  mutation {
    ${modifyDependency} {
      id
      bundleId,
      packageId
      startDate
      endDate
      dependencyLists {
        index
        bundleId
        packageId
        type
      }
    }
  }
`;
};
