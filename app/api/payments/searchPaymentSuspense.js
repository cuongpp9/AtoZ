import gql from 'graphql-tag';
import { convertFilterRequestUrl } from 'utils/utils';
import PaymentSuspenseNS from './constants/PaymentSuspenseNS';

export default ({ page, size, filter, sort }) => {
  const sortStr = sort ? `, sort: ${sort}` : '';
  const filterStr = filter
    ? `, filter: ${convertFilterRequestUrl(filter, PaymentSuspenseNS)}`
    : '';
  const searchPaymentSuspense = `searchPaymentSuspense(page: ${page}, size: ${size}${sortStr}${filterStr})`;

  return gql`
    query {
      ${searchPaymentSuspense} {
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
