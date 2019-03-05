import gql from 'graphql-tag';

export default ({ id, status }) => {
  const updatePriceOfferStatus = `updatePriceOfferStatus(input: { id: "${id}", status: ${status}})`;
  return gql`
  mutation {
    ${updatePriceOfferStatus} {
      id
      status
    }
  }
`;
};
