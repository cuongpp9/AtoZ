import gql from 'graphql-tag';

export default id => gql`
  query {
    getOrderById(input: { id: "${id}" }) {
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
