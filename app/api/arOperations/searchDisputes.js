import gql from 'graphql-tag';
import { convertFilterRequestUrl } from 'utils/utils';
import disputeNS from './constants/disputeNS';

export default ({ page, size, filter, sort }) => {
  const sortStr = sort ? `, sort: ${sort}` : '';
  const filterStr = filter
    ? `, filter: ${convertFilterRequestUrl(filter, disputeNS)}`
    : '';
  const searchDisputes = `searchDisputes(page: ${page}, size: ${size}${sortStr}${filterStr})`;
  return gql`
    query {
      ${searchDisputes} {
        id
        accountId
        userId
        itemId
        invoiceId
        date
        source
        reason
        type
        amount
        percent
        status
      }
    }
  `;
};
