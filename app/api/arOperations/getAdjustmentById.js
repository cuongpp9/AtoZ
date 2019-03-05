import gql from 'graphql-tag';

export default id => gql`
  query {
    getAdjustmentById(input: { id: "${id}" }) {
      id
      accountId
      userId
      itemId
      invoiceId
      startDate
      source
      reason
      type
      arType
      amount
      percent
      numberOfTransactions
      notes
    }
  }
`;
