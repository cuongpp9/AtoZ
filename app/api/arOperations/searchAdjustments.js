import gql from 'graphql-tag';
import { convertFilterRequestUrl } from 'utils/utils';
import adjustmentNS from './constants/adjustmentNS';

export default ({ page, size, filter, sort }) => {
  const sortStr = sort ? `, sort: ${sort}` : '';
  const filterStr = filter
    ? `, filter: ${convertFilterRequestUrl(filter, adjustmentNS)}`
    : '';
  const searchAdjustments = `searchAdjustments(page: ${page}, size: ${size}${sortStr}${filterStr})`;
  return gql`
    query {
      ${searchAdjustments} {
        id
        accountId
        userId
        itemId
        invoiceId
        startDate
        source
        reason
        type
        arType
        amount
      }
    }
  `;
};
