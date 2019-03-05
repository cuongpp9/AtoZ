import gql from 'graphql-tag';

export default id => gql`
  query {
    getSubscriptionByAccountId(input: { id: "${id}" }) {
      id
      accountId
      status
      reason
      initialTerm
      initialTermUnit
      renewalTerm
      renewalTermUnit
      trialTerm
      trialTermUnit
      effectiveDate
    }
  }
`;
