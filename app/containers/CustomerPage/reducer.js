import { fromJS } from 'immutable';
import _ from 'lodash';
import { DEFAULT_SIZE_FETCH } from 'constantsApp';
import * as types from './types';

export const initialState = fromJS({
  listCustomers: [],
  errorMessage: '',
  accountSelected: {},
  isFetchingSuccess: false,
  isPostingSuccess: false,
  params: {
    page: 1,
    size: DEFAULT_SIZE_FETCH,
    filter: {},
    sort: {},
  },
  paramsTransaction: {
    page: 1,
    size: DEFAULT_SIZE_FETCH,
    filter: {},
    sort: {},
  },
  paramsBill: {
    page: 1,
    size: DEFAULT_SIZE_FETCH,
    filter: {},
    sort: {},
  },
  billUnits: [],
  transactionUnits: [],
  priceUnits: [],
  serviceUnitsAc: [],
  subscription: {},
  balanceUnit: {},
  errorPriceUnits: '',
  errorServiceUnits: '',
  errorSubscription: '',
  errorBalanceUnit: '',
  errorTransactionUnit: '',
  errorBillUnit: '',
});

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_CUSTOMERS:
      return state.set('errorMessage', '').set('isFetchingSuccess', false);
    case types.GET_CUSTOMERS_SUCCESS:
      return state
        .set('listCustomers', action.payload)
        .set('isFetchingSuccess', true);
    case types.GET_CUSTOMERS_FAILURE:
      return state.set('errorMessage', action.payload);
    case types.SET_PARAMS: {
      const { page, size } = action.payload;
      return state
        .setIn(['params', 'size'], size)
        .setIn(['params', 'page'], page);
    }
    //-----------------------
    case types.CREATE_ACCOUNT:
      return state.set('errorMessage', '').set('isPostingSuccess', false);
    case types.CREATE_ACCOUNT_SUCCESS:
      return state.set('isPostingSuccess', true);
    case types.CREATE_ACCOUNT_FAILURE:
      return state.set('errorMessage', action.payload);
    case types.GET_ACCOUNT_DETAIL:
      return state.set('accountSelected', {});
    case types.GET_ACCOUNT_DETAIL_SUCCESS:
    case types.MODIFY_ACCOUNT_SUCCESS:
      return state.set('accountSelected', action.payload);
    case types.GET_ACCOUNT_DETAIL_FAILURE:
      return state.set('errorMessage', action.payload);
    // for update account's status
    case types.UPDATE_ACCOUNT_STATUS_SUCCESS: {
      const account = state.get('accountSelected');
      const { status, reason } = action.payload;
      account.status = status;
      account.reason = reason;
      return state.set('accountSelected', _.cloneDeep(account, account));
    }
    // for get price units
    case types.GET_PRICE_UNITS:
      return state.set('priceUnits', []).set('errorPriceUnits', '');
    case types.GET_PRICE_UNITS_SUCCESS:
      return state.set('priceUnits', action.payload);
    case types.GET_PRICE_UNITS_FAILURE:
      return state.set('errorPriceUnits', action.payload);
    // for get service units by account id
    case types.GET_SERVICE_UNITS_AC:
      return state.set('serviceUnitsAc', []).set('errorServiceUnits', '');
    case types.GET_SERVICE_UNITS_AC_SUCCESS:
      return state.set('serviceUnitsAc', action.payload);
    case types.GET_SERVICE_UNITS_AC_FAILURE:
      return state.set('errorServiceUnits', action.payload);
    // for get subscription
    case types.GET_SUBSCRIPTION:
      return state.set('subscription', {}).set('errorSubscription', '');
    case types.GET_SUBSCRIPTION_SUCCESS:
      return state.set('subscription', action.payload);
    case types.GET_SUBSCRIPTION_FAILURE:
      return state.set('errorSubscription', action.payload);
    // for get balance units
    case types.GET_BALANCE_UNIT:
      return state.set('balanceUnit', {}).set('errorBalanceUnit', '');
    case types.GET_BALANCE_UNIT_SUCCESS:
      return state.set('balanceUnit', action.payload);
    case types.GET_BALANCE_UNIT_FAILURE:
      return state.set('errorBalanceUnit', action.payload);
    // for get transaction units
    case types.GET_TRANSACTION_UNIT:
      return state
        .set('errorTransactionUnit', '')
        .set('isFetchingSuccess', false);
    case types.GET_TRANSACTION_UNIT_SUCCESS:
      return state
        .set('transactionUnits', action.payload)
        .set('isFetchingSuccess', true);
    case types.GET_TRANSACTION_UNIT_FAILURE:
      return state.set('errorTransactionUnit', action.payload);
    case types.SET_TRANSACTION_PARAMS: {
      const { page, size } = action.payload;
      return state
        .setIn(['paramsTransaction', 'size'], size)
        .setIn(['paramsTransaction', 'page'], page);
    }
    // for get bill units
    case types.GET_BILL_UNIT:
      return state.set('errorBillUnit', '').set('isFetchingSuccess', false);
    case types.GET_BILL_UNIT_SUCCESS:
      return state
        .set('billUnits', action.payload)
        .set('isFetchingSuccess', true);
    case types.GET_BILL_UNIT_FAILURE:
      return state.set('errorBillUnit', action.payload);
    case types.SET_BILL_PARAMS: {
      const { page, size } = action.payload;
      return state
        .setIn(['paramsBill', 'size'], size)
        .setIn(['paramsBill', 'page'], page);
    }
    default:
      return state;
  }
}
