// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';

export default data => {
  const dataCreate = parseToMutationRequest(data, ['reversedAmount', 'reason']);
  const reversePayment = `reversePayment(input: ${dataCreate})`;
  return gql`
  mutation {
    ${reversePayment} {
      id
      accountId
      invoiceUnitId
      transactionId
      paymentDate
      arOpsPaymentId
      status
      amount
      remainingAmount
    }
  }
`;
};
