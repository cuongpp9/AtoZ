import gql from 'graphql-tag';

export default id => gql`
  query {
    getDisputeById(input: { id: "${id}" }) {
      id
      type
      status
      taxRule
      amount
      percent
      reason
      source
      itemId
      accountId
      invoiceId
      userId
      date
      settledAmount
      settlementDate
      notes
    }
  }
`;
