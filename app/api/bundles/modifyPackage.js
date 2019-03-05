import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import packageNS from './constants/packageNS';

export default data => {
  const dataCreate = parseToMutationRequest(data, packageNS);
  const modifyPackage = `modifyPackage(input: ${dataCreate})`;
  return gql`
  mutation {
    ${modifyPackage} {
      id
      name
      description
      minimumQuantity
      maximumQuantity
      salesChannel
      marketSegment
      accountType
      accountSubType
      country
      currency
      startDate
      endDate
      status
      components{
        index
        serviceType
        serviceAddOn
        discountOfferId
        bundleId
        validityDuration
        validityUnit
      }
    }
  }
`;
};
