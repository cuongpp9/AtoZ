import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import orderNS from './constants/orderNS';

export default data => {
  const dataCreate = parseToMutationRequest(data, orderNS);
  const createOrder = `createOrder(input: ${dataCreate})`;
  return gql`
  mutation {
    ${createOrder} {
      id
    }
  }
`;
};
