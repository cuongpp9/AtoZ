import gql from 'graphql-tag';
import { convertFilterRequestUrl } from 'utils/utils';
import writeOffNS from './constants/writeOffNS';

export default ({ page, size, filter, sort }) => {
  const sortStr = sort ? `, sort: ${sort}` : '';
  const filterStr = filter
    ? `, filter: ${convertFilterRequestUrl(filter, writeOffNS)}`
    : '';
  const searchWriteoffs = `searchWriteoffs(page: ${page}, size: ${size}${sortStr}${filterStr})`;
  return gql`
    query {
      ${searchWriteoffs} {
        id
        type
        date
        accountId
        userId
        itemId
        source
        reason
        status
        invoiceId
        amount
        percent
      }
    }
  `;
};
