import { fromJS } from 'immutable';
import * as types from './types';

export const initialState = fromJS({
  errorMessage: '',
  isFetchingSuccess: false,
  listItems: [],
  listPriceOffers: [],
  paramsItems: {
    page: 1,
    size: 20,
    filter: {},
    sort: {},
  },
  paramsPriceOffers: {
    page: 1,
    size: 20,
    filter: {},
    sort: {},
  },
  itemInfo: {},
  priceOfferInfo: {},
});

export default function(state = initialState, action) {
  switch (action.type) {
    // -------Items
    case types.SEARCH_ITEMS:
      return state.set('errorMessage', '').set('isFetchingSuccess', false);
    case types.SEARCH_ITEMS_SUCCESS:
      return state
        .set('listItems', action.payload)
        .set('isFetchingSuccess', true);
    case types.SEARCH_ITEMS_FAILURE:
      return state.set('errorMessage', action.payload);
    case types.SET_PARAMS_ITEMS: {
      const { page, size } = action.payload;
      return state
        .setIn(['paramsItems', 'size'], size)
        .setIn(['paramsItems', 'page'], page);
    }

    case types.GET_ITEM_DETAIL_FAILURE:
      return state.set('errorMessage', action.payload);
    case types.GET_ITEM_DETAIL:
      return state.set('itemInfo', {}).set('errorMessage', '');
    case types.GET_ITEM_DETAIL_SUCCESS:
    case types.MODIFY_ITEM_SUCCESS:
      return state.set('itemInfo', action.payload);

    case types.CREATE_ITEM:
      return state.set('errorMessage', '').set('isPostingSuccess', false);
    case types.CREATE_ITEM_SUCCESS:
      return state.set('isPostingSuccess', true);
    case types.CREATE_ITEM_FAILURE:
      return state.set('errorMessage', action.payload);
    // -------priceOffers
    case types.SEARCH_PRICE_OFFERS:
      return state.set('errorMessage', '').set('isFetchingSuccess', false);
    case types.SEARCH_PRICE_OFFERS_SUCCESS:
      return state
        .set('listPriceOffers', action.payload)
        .set('isFetchingSuccess', true);
    case types.SEARCH_PRICE_OFFERS_FAILURE:
      return state.set('errorMessage', action.payload);
    case types.SET_PARAMS_PRICE_OFFERS: {
      const { page, size } = action.payload;
      return state
        .setIn(['paramsPriceOffers', 'size'], size)
        .setIn(['paramsPriceOffers', 'page'], page);
    }

    case types.GET_PRICE_OFFER_DETAIL_FAILURE:
      return state.set('errorMessage', action.payload);
    case types.GET_PRICE_OFFER_DETAIL:
      return state.set('priceOfferInfo', {}).set('errorMessage', '');
    case types.GET_PRICE_OFFER_DETAIL_SUCCESS:
    case types.MODIFY_PRICE_OFFER_SUCCESS:
      return state.set('priceOfferInfo', action.payload);

    case types.CREATE_PRICE_OFFER:
      return state.set('errorMessage', '').set('isPostingSuccess', false);
    case types.CREATE_PRICE_OFFER_SUCCESS:
      return state.set('isPostingSuccess', true);
    case types.CREATE_PRICE_OFFER_FAILURE:
      return state.set('errorMessage', action.payload);
    // for update item' status
    case types.UPDATE_ITEM_STATUS_SUCCESS: {
      const itemInfo = state.get('itemInfo');
      itemInfo.status = action.payload.status;
      return state.set('itemInfo', Object.assign({}, itemInfo));
    }
    // for update price offer' status
    case types.UPDATE_PRICE_OFFER_STATUS_SUCCESS: {
      const priceOfferInfo = state.get('priceOfferInfo');
      priceOfferInfo.status = action.payload.status;
      return state.set('priceOfferInfo', Object.assign({}, priceOfferInfo));
    }
    default:
      return state;
  }
}
