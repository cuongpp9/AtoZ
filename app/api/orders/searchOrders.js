import gql from 'graphql-tag';
import { convertFilterRequestUrl } from 'utils/utils';
import orderNS from './constants/orderNS';

export default ({ page, size, filter, sort }) => {
  const sortStr = sort ? `, sort: ${sort}` : '';
  const filterStr = filter
    ? `, filter: ${convertFilterRequestUrl(filter, orderNS)}`
    : '';
  const searchOrders = `searchOrders(page: ${page}, size: ${size}${sortStr}${filterStr})`;
  return gql`
    query {
      ${searchOrders} {
        id
        type
        status
        reason
        accountId
        userId
        effectiveDate
        submittedDate
      }
    }
  `;
};
