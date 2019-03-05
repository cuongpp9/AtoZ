import gql from 'graphql-tag';
import { convertFilterRequestUrl } from 'utils/utils';
import itemNS from './constants/itemNS';

export default ({ page, size, filter, sort }) => {
  const sortStr = sort ? `, sort: ${sort}` : '';
  const filterStr = filter
    ? `, filter: ${convertFilterRequestUrl(filter, itemNS)}`
    : '';
  const searchItems = `searchItems(page: ${page}, size: ${size}${sortStr}${filterStr})`;
  return gql`
    query {
      ${searchItems} {
        id
        name
        description
        company
        revenueType
        productFamily
        productLine
        productType
        productSubType
        isBundled
        glAccount
        taxCode
        isDiscountable
        status
    }
  }
  `;
};
