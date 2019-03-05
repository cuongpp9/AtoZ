import gql from 'graphql-tag';

export default () => gql`
  query {
    getArOpsConfigByType(input: { arOpsConfigType: REASON_CODES }) {
      arOpsConfigType
      reasonCodes {
        index
        taxCode
        gLAccount
        type
        reasonCode
      }
    }
  }
`;
