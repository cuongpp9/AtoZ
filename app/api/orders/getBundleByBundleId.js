import gql from 'graphql-tag';

export default id => gql`
  query {
    getBundleById(input: { id: "${id}" }) {
      name
      components{
        serviceType
        priceOfferId
      }
    }
  }
`;
