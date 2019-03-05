import gql from 'graphql-tag';
import { convertFilterRequestUrl } from 'utils/utils';
import packageNS from './constants/packageNS';

export default ({ page, size, filter, sort }) => {
  const sortStr = sort ? `, sort: ${sort}` : '';
  const filterStr = filter
    ? `, filter: ${convertFilterRequestUrl(filter, packageNS)}`
    : '';
  const searchPackages = `searchPackages(page: ${page}, size: ${size}${sortStr}${filterStr})`;
  return gql`
    query {
      ${searchPackages} {
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
          bundleId
        }
    }
  }
  `;
};
