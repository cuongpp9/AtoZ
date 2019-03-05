/**
 * PricingManagerpage selectors
 */

import { createSelector } from 'reselect';

const selectPricingManager = state => state.get('pricingReducer');

// ----item
const makePageItemParams = () =>
  createSelector(selectPricingManager, items =>
    items.get('paramsItems').toJS(),
  );

const makeGetListItems = () =>
  createSelector(selectPricingManager, items => [...items.get('listItems')]);

const makeGetItemDetail = () =>
  createSelector(selectPricingManager, item => item.get('itemInfo'));

// ----price-offer
const makePagePriceOfferParams = () =>
  createSelector(selectPricingManager, prices =>
    prices.get('paramsPriceOffers').toJS(),
  );

const makeGetListPriceOffers = () =>
  createSelector(selectPricingManager, prices => [
    ...prices.get('listPriceOffers'),
  ]);

const makeGetPriceOfferDetail = () =>
  createSelector(selectPricingManager, price => price.get('priceOfferInfo'));

const makeErrorMessage = () =>
  createSelector(selectPricingManager, item => item.get('errorMessage'));

export {
  makeGetListItems,
  makePageItemParams,
  makeGetItemDetail,
  makeGetListPriceOffers,
  makePagePriceOfferParams,
  makeGetPriceOfferDetail,
  makeErrorMessage,
};
