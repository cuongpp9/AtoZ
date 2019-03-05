import { fromJS } from 'immutable';
import * as types from './types';

export const initialState = fromJS({
  listOrders: [],
  errorMessage: '',
  isFetchingSuccess: false,
  isPostingSuccess: false,
  params: {
    page: 1,
    size: 5,
    filter: {},
    sort: {},
  },
  orderDetail: {},
  subscription: {},
  errorSubscription: '',
  serviceUnits: [],
  errorServiceUnits: '',
  priceUnits: [],
  errorPriceUnits: '',
});

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SEARCH_ORDERS:
      return state.set('errorMessage', '').set('isFetchingSuccess', false);
    case types.SEARCH_ORDERS_SUCCESS:
      return state
        .set('listOrders', action.payload)
        .set('isFetchingSuccess', true);
    case types.SEARCH_ORDERS_FAILURE:
      return state.set('errorMessage', action.payload);
    case types.SET_PARAMS: {
      const { page, size } = action.payload;
      return state
        .setIn(['params', 'size'], size)
        .setIn(['params', 'page'], page);
    }
    case types.GET_ORDERS_DETAIL:
      return state.set('errorMessage', '').set('isFetchingSuccess', false);
    case types.GET_ORDERS_DETAIL_SUCCESS:
    case types.MODIFY_ORDER_SUCCESS:
      return state
        .set('orderDetail', action.payload)
        .set('isFetchingSuccess', true);
    case types.GET_ORDERS_DETAIL_FAILURE:
      return state.set('errorMessage', action.payload);
    case types.CREATE_ORDERS:
      return state.set('errorMessage', '').set('isPostingSuccess', false);
    case types.CREATE_ORDERS_SUCCESS:
      return state.set('isPostingSuccess', true);
    case types.CREATE_ORDERS_FAILURE:
      return state.set('errorMessage', action.payload);
    // for update order' status
    case types.UPDATE_ORDER_STATUS_SUCCESS: {
      const orderDetail = state.get('orderDetail');
      orderDetail.status = action.payload.status;
      orderDetail.reason = action.payload.reason;
      return state.set('orderDetail', Object.assign({}, orderDetail));
    }

    case types.GET_SUBSCRIPTION_BY_ACCOUNT_ID:
      return state
        .set('subscription', {})
        .set('serviceUnits', [])
        .set('errorSubscription', '');
    case types.GET_SUBSCRIPTION_BY_ACCOUNT_ID_SUCCESS:
      return state.set('subscription', action.payload);
    case types.GET_SUBSCRIPTION_BY_ACCOUNT_ID_FAILURE:
      return state.set('errorSubscription', action.payload);

    case types.GET_SERVICE_UNITS_BY_SUBSCRIPTION_ID:
      return state.set('errorServiceUnits', '');
    case types.GET_SERVICE_UNITS_BY_SUBSCRIPTION_ID_SUCCESS:
      return state.set('serviceUnits', action.payload);
    case types.GET_SERVICE_UNITS_BY_SUBSCRIPTION_ID_FAILURE:
      return state.set('errorServiceUnits', action.payload);

    case types.GET_PRICE_UNITS_BY_SERVICE_UNIT_ID:
      return state.set('priceUnits', []).set('errorPriceUnits', '');
    case types.GET_PRICE_UNITS_BY_SERVICE_UNIT_ID_SUCCESS:
      return state.set('priceUnits', action.payload);
    case types.GET_PRICE_UNITS_BY_SERVICE_UNIT_ID_FAILURE:
      return state.set('errorPriceUnits', action.payload);
    default:
      return state;
  }
}
