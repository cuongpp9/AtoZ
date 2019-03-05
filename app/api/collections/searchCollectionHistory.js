import gql from 'graphql-tag';
import { convertFilterRequestUrl } from 'utils/utils';
import historyNS from './constants/historyNS';

export default ({ page, size, filter, sort }) => {
  const sortStr = sort ? `, sort: ${sort}` : '';
  const filterStr = filter
    ? `, filter: ${convertFilterRequestUrl(filter, historyNS)}`
    : '';
  const searchCollectionHistory = `searchCollectionHistory(page: ${page}, size: ${size}${sortStr}${filterStr})`;
  return gql`
    query {
      ${searchCollectionHistory} {
        id
        accountId
        invoiceId
        userId
        invoiceDate
        dueDate
        lastActionDate
        notes
        closedDate
        daysInCollection
        index
        status
      }
    }
  `;
};
