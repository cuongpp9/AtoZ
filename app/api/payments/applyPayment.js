// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import OneOffPaymentNS from './constants/OneOffPaymentNS';

export default data => {
  const dataCreate = parseToMutationRequest(data, OneOffPaymentNS);
  const applyPayment = `applyPayment(input: ${dataCreate})`;

  return gql`
  mutation {
    ${applyPayment} {
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
