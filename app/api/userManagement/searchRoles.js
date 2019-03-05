import gql from 'graphql-tag';
import { convertFilterRequestUrl } from 'utils/utils';

export default ({ page, size, filter, sort }) => {
  const sortStr = sort ? `, sort: ${sort}` : '';
  const filterStr = filter
    ? `, filter: ${convertFilterRequestUrl(filter, ['status'])}`
    : '';
  const searchQuery = `searchRoles(page: ${page}, size: ${size}${sortStr}${filterStr})`;
  return gql`
    query {
      ${searchQuery} {
        id
        name
        description
        type
        status
      }
    }
  `;
};
