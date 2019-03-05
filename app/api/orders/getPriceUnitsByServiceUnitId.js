import gql from 'graphql-tag';

export default id => gql`
  query {
    getPriceUnitsByServiceUnitId(input: { id: "${id}" }) {
      id
      accountId
      priceOfferId
      subscriptionId
      serviceUnitId
      bundleId
      packageId
      status
      serviceType
      priceOverride
      priceOffset
      discountPercent
      quantity
      startDate
      endDate
    }
  }
`;
