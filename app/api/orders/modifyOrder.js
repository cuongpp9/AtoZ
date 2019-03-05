import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import orderNS from './constants/orderNS';

export default data => {
  const dataCreate = parseToMutationRequest(data, orderNS);
  const modifyOrder = `modifyOrder(input: ${dataCreate})`;
  return gql`
  mutation {
    ${modifyOrder} {
      id
      type
      status
      reason
      accountId
      userId
      isPartialFulfillmentAllowed
      effectiveDate
      submittedDate
      initialTerm
      initialTermUnit
      renewalTerm
      renewalTermUnit
      trialTerm
      trialTermUnit
      services {
        index
        serviceType
        provisioningId
        action
        reason
        status
        bundleId
        packageId
        lines {
          index
          action
          status
          reason
          quantity
          priceOverride
          priceOffset
          discountPercent
          startDate
          endDate
          relativeStart
          relativeEnd
          relativeStartUnit
          relativeEndUnit
          priceOfferId
          discountOfferId
        }
      }
    }
  }
`;
};
