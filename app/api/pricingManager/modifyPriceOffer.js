import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import priceOfferNS from './constants/priceOfferNS';

export default data => {
  const dataCreate = parseToMutationRequest(data, priceOfferNS);
  const modifyPriceOffer = `modifyPriceOffer(input: ${dataCreate})`;
  return gql`
  mutation {
    ${modifyPriceOffer} {
      id
      name
      description
      transactionType
      pricingModel
      serviceType
      serviceAddOn
      itemId
      startUnit
      startDuration
      endUnit
      endDuration
      minimumQuantity
      maximumQuantity
      salesChannel
      marketSegment
      accountType
      accountSubType
      startDate
      endDate
      status
      flatPricing{
        prices {
          index
          refIndex
          currencyId
          amount
          isQuantityScalable
        }
      }
      recurringPricing{
        purchaseProration
        cancelProration
        upgradeProration
        downgradeProration
        prices{
          index
          refIndex
          currencyId
          amount
          isQuantityScalable
        }
      }
      customerPricing {
        index
        salesChannel
        marketSegment
        accountType
        accountSubType
        prices{
          index
          refIndex
          currencyId
          amount
          isQuantityScalable
        }
      }
    }
  }
`;
};
