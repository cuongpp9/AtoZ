import gql from 'graphql-tag';
import { convertFilterRequestUrl } from 'utils/utils';
import dependencyNS from './constants/dependencyNS';

export default ({ page, size, filter, sort }) => {
  const sortStr = sort ? `, sort: ${sort}` : '';
  const filterStr = filter
    ? `, filter: ${convertFilterRequestUrl(filter, dependencyNS)}`
    : '';
  const searchDependencies = `searchDependencies(page: ${page}, size: ${size}${sortStr}${filterStr})`;
  return gql`
    query {
      ${searchDependencies} {
       id
       bundleId
       packageId
       startDate
       endDate
       dependencyLists {
         type
       }
    }
  }
  `;
};
