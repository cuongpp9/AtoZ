// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';

export default data => {
  const dataCreate = parseToMutationRequest(data, [
    'status',
    'reason',
    'method',
  ]);
  const modifyPaymentSuspense = `modifyPaymentSuspense(input: ${dataCreate})`;
  return gql`
  mutation {
    ${modifyPaymentSuspense} {
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
