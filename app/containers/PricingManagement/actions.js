import * as types from './types';

export function searchItems(payload, cb) {
  return {
    type: types.SEARCH_ITEMS,
    payload,
    cb,
  };
}

export function searchItemsSuccess(payload) {
  return {
    type: types.SEARCH_ITEMS_SUCCESS,
    payload,
  };
}

export function searchItemsFailure(payload) {
  return {
    type: types.SEARCH_ITEMS_FAILURE,
    payload,
  };
}

export function setParamsItems(payload) {
  return {
    type: types.SET_PARAMS_ITEMS,
    payload,
  };
}

export function getItemDetail(payload) {
  return {
    type: types.GET_ITEM_DETAIL,
    payload,
  };
}

export function getItemDetailSuccess(payload) {
  return {
    type: types.GET_ITEM_DETAIL_SUCCESS,
    payload,
  };
}

export function getItemDetailFailure(payload) {
  return {
    type: types.GET_ITEM_DETAIL_FAILURE,
    payload,
  };
}

export function createItem(payload, cb) {
  return {
    type: types.CREATE_ITEM,
    payload,
    cb,
  };
}

export function createItemSuccess() {
  return {
    type: types.CREATE_ITEM_SUCCESS,
  };
}

export function createItemFailure(payload) {
  return {
    type: types.CREATE_ITEM_FAILURE,
    payload,
  };
}

// ------------priceOffers
export function setParamsPriceOffers(payload) {
  return {
    type: types.SET_PARAMS_PRICE_OFFERS,
    payload,
  };
}

export function searchPriceOffers(payload, cb) {
  return {
    type: types.SEARCH_PRICE_OFFERS,
    payload,
    cb,
  };
}

export function searchPriceOffersSuccess(payload) {
  return {
    type: types.SEARCH_PRICE_OFFERS_SUCCESS,
    payload,
  };
}

export function searchPriceOffersFailure(payload) {
  return {
    type: types.SEARCH_PRICE_OFFERS_FAILURE,
    payload,
  };
}

export function getPriceOfferDetail(payload) {
  return {
    type: types.GET_PRICE_OFFER_DETAIL,
    payload,
  };
}

export function getPriceOfferDetailSuccess(payload) {
  return {
    type: types.GET_PRICE_OFFER_DETAIL_SUCCESS,
    payload,
  };
}

export function getPriceOfferDetailFailure(payload) {
  return {
    type: types.GET_PRICE_OFFER_DETAIL_FAILURE,
    payload,
  };
}

export function createPriceOffer(payload, cb) {
  return {
    type: types.CREATE_PRICE_OFFER,
    payload,
    cb,
  };
}

export function createPriceOfferSuccess() {
  return {
    type: types.CREATE_PRICE_OFFER_SUCCESS,
  };
}

export function createPriceOfferFailure(payload) {
  return {
    type: types.CREATE_PRICE_OFFER_FAILURE,
    payload,
  };
}

// modify item
export function modifyItem(payload, cb) {
  return {
    type: types.MODIFY_ITEM,
    payload,
    cb,
  };
}

export function modifyItemSuccess(payload) {
  return {
    type: types.MODIFY_ITEM_SUCCESS,
    payload,
  };
}

// update item status
export function updateItemStatus(payload, cb) {
  return {
    type: types.UPDATE_ITEM_STATUS,
    payload,
    cb,
  };
}

export function updateItemStatusSuccess(payload) {
  return {
    type: types.UPDATE_ITEM_STATUS_SUCCESS,
    payload,
  };
}

// modify price offer
export function modifyPriceOffer(payload, cb) {
  return {
    type: types.MODIFY_PRICE_OFFER,
    payload,
    cb,
  };
}

export function modifyPriceOfferSuccess(payload) {
  return {
    type: types.MODIFY_PRICE_OFFER_SUCCESS,
    payload,
  };
}

// update price offer status
export function updatePriceOfferStatus(payload, cb) {
  return {
    type: types.UPDATE_PRICE_OFFER_STATUS,
    payload,
    cb,
  };
}

export function updatePriceOfferStatusSuccess(payload) {
  return {
    type: types.UPDATE_PRICE_OFFER_STATUS_SUCCESS,
    payload,
  };
}
