import gql from 'graphql-tag';
import { convertFilterRequestUrl } from 'utils/utils';
import searchAccountNS from './constants/searchAccountNS';
export default ({ page, size, filter, sort }) => {
  const sortStr = sort ? `, sort: ${sort}` : '';
  const filterStr = filter
    ? `, filter: ${convertFilterRequestUrl(filter, searchAccountNS)}`
    : '';
  const searchAccountsInCollection = `searchAccountsInCollection(page: ${page}, size: ${size}${sortStr}${filterStr})`;
  return gql`
    query {
      ${searchAccountsInCollection} {
        index
        userId
        accountId
        status
        currency
        city
        state
        firstName
        lastName
        organization
        email
        numberInvoicesInCollection
      }
    }
  `;
};
