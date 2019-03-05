import gql from 'graphql-tag';
import { convertFilterRequestUrl } from 'utils/utils';
import transactionUnitNS from './constants/transactionUnitNS';

export default ({ page, size, filter, sort }) => {
  const sortStr = sort ? `, sort: ${sort}` : '';
  const filterStr = filter
    ? `, filter: ${convertFilterRequestUrl(filter, transactionUnitNS)}`
    : '';
  const searchTransactionUnits = `searchTransactionUnits(page: ${page}, size: ${size}${sortStr}${filterStr})`;
  return gql`
    query {
      ${searchTransactionUnits} {
        id
        type
        billUnitId
        accountId
        serviceType
        itemId
        source
        startDate
        endDate
      }
    }
  `;
};
