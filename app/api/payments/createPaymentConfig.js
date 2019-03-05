// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import paymentNS from './constants/paymentNS';

export default data => {
  const dataCreate = parseToMutationRequest(data, paymentNS);
  const createPaymentConfig = `createPaymentConfig(input: ${dataCreate})`;
  return gql`
  mutation {
    ${createPaymentConfig} {
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
