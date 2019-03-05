import gql from 'graphql-tag';
import { convertFilterRequestUrl } from 'utils/utils';

export default ({ page, size, filter, sort }) => {
  const sortStr = sort ? `, sort: ${sort}` : '';
  const filterStr = filter
    ? `, filter: ${convertFilterRequestUrl(filter, [])}`
    : '';
  const searchInvoiceUnitsInCollection = `searchInvoiceUnitsInCollection(page: ${page}, size: ${size}${sortStr}${filterStr})`;
  return gql`
    query {
      ${searchInvoiceUnitsInCollection} {
        totalInCollection
        invoicesInCollection {
          id
          invoiceId
          invoiceDate
          dueDate
          lastActionDate
          index
          daysInCollection
          amount
          due
          status
        }
      }
    }
  `;
};
