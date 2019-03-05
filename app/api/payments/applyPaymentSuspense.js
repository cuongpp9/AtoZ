// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';

export default data => {
  const dataCreate = parseToMutationRequest(data, []);
  const applyPaymentSuspense = `applyPaymentSuspense(input: ${dataCreate})`;

  return gql`
  mutation {
    ${applyPaymentSuspense} {
      id
      accountId
      invoiceUnitId
      transactionId
      paymentId
      paymentDate
      closedDate
      amount
      status
      reason
      method
      suspenseCreditCards {
        cardToken
        cardExpiry
        last4CC
        merchant
      }
      suspenseInvoices {
        bank
        checkNumber 
        routingNumber
      }
    }
  }
`;
};
