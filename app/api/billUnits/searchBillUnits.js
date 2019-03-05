import gql from 'graphql-tag';
import { convertFilterRequestUrl } from 'utils/utils';
import billUnitNS from './constants/billUnitNS';

export default ({ page, size, filter, sort }) => {
  const sortStr = sort ? `, sort: ${sort}` : '';
  const filterStr = filter
    ? `, filter: ${convertFilterRequestUrl(filter, billUnitNS)}`
    : '';
  const searchBillUnits = `searchBillUnits(page: ${page}, size: ${size}${sortStr}${filterStr})`;
  return gql`
    query {
      ${searchBillUnits} {
        id
        type
        status
        accountId
        startDate
        endDate
        billingProfileId
        parentProfileId
        parentId
        total
        nonPayingTotal
        billTotal
      }
    }
  `;
};
