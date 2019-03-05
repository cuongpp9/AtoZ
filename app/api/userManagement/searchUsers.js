import gql from 'graphql-tag';
import { convertFilterRequestUrl } from 'utils/utils';

export default ({ page, size, filter, sort }) => {
  const sortStr = sort ? `, sort: ${sort}` : '';
  const filterStr = filter
    ? `, filter: ${convertFilterRequestUrl(filter, ['status', 'category'])}`
    : '';
  const searchUsers = `searchUsers(page: ${page}, size: ${size}${sortStr}${filterStr})`;
  return gql`
    query {
      ${searchUsers} {
        id
        userId,
        password,
        type,
        status,
        category,
        address{
          street,
          extraLine,
          landmark,
          city
        },
        contact {
          salutation,
          firstName
        },
        roles {
          index,
          roleId
        },
        roleGroups{
          index,
          roleGroupId
        }
      }
    }
  `;
};
