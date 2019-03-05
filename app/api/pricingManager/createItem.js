import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import itemNS from './constants/itemNS';

export default data => {
  const dataCreate = parseToMutationRequest(data, itemNS);
  const createItem = `createItem(input: ${dataCreate})`;
  return gql`
  mutation {
    ${createItem} {
      id
    }
  }
`;
};
