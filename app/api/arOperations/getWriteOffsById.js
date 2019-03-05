import gql from 'graphql-tag';

export default id => gql`
  query {
    getWriteoffById(input: { id: "${id}" }) {
      id
      type
      userId
      notes
      accountId
      invoiceId
      itemId
      reason
      source
      taxRule
      date
      amount
      percent
      recoveryAmount
      status
      recoveryDate
    }
  }
`;
