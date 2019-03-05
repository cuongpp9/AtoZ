import gql from 'graphql-tag';

export default id => gql`
  query {
    getBalanceUnitByAccountId(input: { id: "${id}" }) {
      id
      accountId
      billingProfileId
      subscriptionId
      balances {
        currencyId
        amount
        creditLimit
      }
      grants {
        index
        resourceId
        grantAmount
        amountUsed
        startDate
        endDate
      }
      accumulators {
        index
        resourceId
        amount
        startDate
        endDate
      }
    }
  }
`;
