import gql from 'graphql-tag';

export default type => {
  const getPaymentConfigByType = `getPaymentConfigByType(input: {paymentConfigType:${type}})`;
  return gql`
    query {
      ${getPaymentConfigByType} {
        id
        paymentConfigType
        paymentMerchants {
          index
          provider
          token
          id
        }
        paymentMethods {
          index
          method
          id
        }
        paymentTerms {
          index
          paymentTerm
          days
          offset
          paymentWorkingDay
          id
        }
      }
    }
  `;
};
