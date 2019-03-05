import gql from 'graphql-tag';

export default id => gql`
  query {
    getBundleById(input: { id: "${id}" }) {
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
