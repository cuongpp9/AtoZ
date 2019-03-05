import gql from 'graphql-tag';

export default id => gql`
  query {
    getItemById(input: { id: "${id}" }) {
      id
      name
      description
      company
      revenueType
      productFamily
      productLine
      productType
      productSubType
      parentItemId
      isBundled
      isDiscountable
      externalId
      externalName
      glAccount
      taxCode
      status
      startDate
      endDate
    }
  }
`;
