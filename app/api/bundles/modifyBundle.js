import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import bundleNS from './constants/bundleNS';

export default data => {
  const dataCreate = parseToMutationRequest(data, bundleNS);
  const modifyBundle = `modifyBundle(input: ${dataCreate})`;
  return gql`
  mutation {
    ${modifyBundle} {
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
        priceOfferId
        discountOfferId
        bundleId
        validityDuration
        validityUnit
      }
    }
  }
`;
};
