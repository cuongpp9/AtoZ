import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import priceOfferNS from './constants/priceOfferNS';

export default data => {
  const dataCreate = parseToMutationRequest(data, priceOfferNS);
  const createPriceOffer = `createPriceOffer(input: ${dataCreate})`;
  return gql`
  mutation {
    ${createPriceOffer} {
      id
    }
  }
`;
};
