import gql from 'graphql-tag';

export default id => gql`
  query {
    getServiceUnitsByAccountId(input: { id: "${id}" }) {
      id
      accountId
      status
      reason
      type
      parentId
      provisioningId
      packageId
      bundleId
      subscriptionId
      effectiveDate
    }
  }
`;
