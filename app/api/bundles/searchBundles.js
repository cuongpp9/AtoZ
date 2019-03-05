import gql from 'graphql-tag';
import { convertFilterRequestUrl } from 'utils/utils';
import bundleNS from './constants/bundleNS';

export default ({ page, size, filter, sort }) => {
  const sortStr = sort ? `, sort: ${sort}` : '';
  const filterStr = filter
    ? `, filter: ${convertFilterRequestUrl(filter, bundleNS)}`
    : '';
  const searchBundles = `searchBundles(page: ${page}, size: ${size}${sortStr}${filterStr})`;
  return gql`
    query {
      ${searchBundles} {
        id
        name
        description
        salesChannel
        marketSegment
        accountType
        accountSubType
        country
        currency
        status
        startDate
        components {
          serviceType
          priceOfferId
          discountOfferId
        }
    }
  }
  `;
};
