import gql from 'graphql-tag';
import { convertFilterRequestUrl } from 'utils/utils';
import invoiceNS from './constants/invoiceNS';

export default ({ page, size, filter, sort }) => {
  const sortStr = sort ? `, sort: ${sort}` : '';
  const filterStr = filter
    ? `, filter: ${convertFilterRequestUrl(filter, invoiceNS)}`
    : '';
  const searchInvoiceUnits = `searchInvoiceUnits(page: ${page}, size: ${size}${sortStr}${filterStr})`;
  return gql`
    query {
      ${searchInvoiceUnits} {
        id
        type
        invoiceType
        invoiceDate
        dueDate
        total
        due
        status
      }
    }
  `;
};
