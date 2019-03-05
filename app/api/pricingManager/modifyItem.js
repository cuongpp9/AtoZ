import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import itemNS from './constants/itemNS';

export default data => {
  const dataCreate = parseToMutationRequest(data, itemNS);
  const modifyItem = `modifyItem(input: ${dataCreate})`;
  return gql`
  mutation {
    ${modifyItem} {
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
      externalId
      externalName
      glAccount
      taxCode
      startDate
      endDate
      isDiscountable
      status
    }
  }
`;
};
