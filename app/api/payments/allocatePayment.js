// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';

export default data => {
  const dataCreate = parseToMutationRequest(data, ['amount']);
  const allocatePayment = `allocatePayment(input: ${dataCreate})`;

  return gql`
  mutation {
    ${allocatePayment} {
      id
      accountId
      invoiceUnitId
      transactionId
      paymentDate
      arOpsPaymentId
      arOpsReversalId
      paymentSuspenseId
      status
      amount
      remainingAmount
      reversedAmount
      method
      paymentCreditCards {
        cardToken
        cardExpiry
        last4CC
        merchant
      }
      paymentInvoices{
        bank
        checkNumber
        routingNumber
      }
    }
  }
`;
};
