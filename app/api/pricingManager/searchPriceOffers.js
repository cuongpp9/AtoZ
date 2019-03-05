import gql from 'graphql-tag';
import { convertFilterRequestUrl } from 'utils/utils';
import priceOfferNS from './constants/priceOfferNS';

export default ({ page, size, filter, sort }) => {
  const sortStr = sort ? `, sort: ${sort}` : '';
  const filterStr = filter
    ? `, filter: ${convertFilterRequestUrl(filter, priceOfferNS)}`
    : '';
  const searchPriceOffers = `searchPriceOffers(page: ${page}, size: ${size}${sortStr}${filterStr})`;
  return gql`
    query {
      ${searchPriceOffers} {
        id
        name
        description
        serviceType
        transactionType
        salesChannel
        marketSegment
        accountType
        accountSubType
        pricingModel
        transactionType
        serviceAddOn
        itemId
        status
        startDate
    }
  }
  `;
};
