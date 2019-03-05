import gql from 'graphql-tag';

export default id => gql`
  query {
    getPackageById(input: { id: "${id}" }) {
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
