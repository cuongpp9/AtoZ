import { fromJS } from 'immutable';
import * as types from './types';

export const initialState = fromJS({
  listPayments: [],
  errorMessagePayments: '',
  paramsPayments: {
    page: 1,
    size: 20,
    filter: {},
    sort: {},
  },
  listPaymentSuspense: [],
  errorMessagePaymentSuspense: '',
  paramsPaymentSuspense: {
    page: 1,
    size: 20,
    filter: {},
    sort: {},
  },
  invoices: [],
  errorMsgInvoices: '',
  isFetchingSuccess: false,
  errorMessageAccounts: '',
  paramAccounts: {
    page: 1,
    size: 20,
    filter: {},
    sort: {},
  },
  listAccounts: [],
});

export default function(state = initialState, action) {
  switch (action.type) {
    // -------Search Account
    case types.SEARCH_ACCOUNTS:
      return state
        .set('errorMessageAccounts', '')
        .set('isFetchingSuccess', false);
    case types.SEARCH_ACCOUNTS_SUCCESS:
      return state
        .set('listAccounts', action.payload)
        .set('isFetchingSuccess', true);
    case types.SEARCH_ACCOUNTS_FAILURE:
      return state.set('errorMessageAccounts', action.payload);
    case types.SET_PARAMS_ACCOUNTS: {
      const { page, size } = action.payload;
      return state
        .setIn(['paramAccounts', 'size'], size)
        .setIn(['paramAccounts', 'page'], page);
    }
    // -------Payments
    case types.SEARCH_PAYMENTS: {
      const { resetList } = action.payload;
      if (resetList) {
        return state.set('errorMessagePayments', '').set('listPayments', []);
      }
      return state.set('errorMessagePayments', '');
    }
    case types.SEARCH_PAYMENTS_SUCCESS:
      return state.set('listPayments', action.payload);
    case types.SEARCH_PAYMENTS_FAILURE:
      return state.set('errorMessagePayments', action.payload);
    case types.SET_PARAMS_PAYMENTS: {
      const { page, size } = action.payload;
      return state
        .setIn(['paramsPayments', 'size'], size)
        .setIn(['paramsPayments', 'page'], page);
    }

    case types.SEARCH_PAYMENTS_SUSPENSE: {
      const { resetList } = action.payload;
      if (resetList) {
        return state
          .set('errorMessagePaymentSuspense', '')
          .set('listPaymentSuspense', []);
      }
      return state.set('errorMessagePaymentSuspense', '');
    }
    case types.SEARCH_PAYMENTS_SUSPENSE_SUCCESS:
      return state.set('listPaymentSuspense', action.payload);
    case types.SEARCH_PAYMENTS_SUSPENSE_FAILURE:
      return state.set('errorMessagePaymentSuspense', action.payload);
    case types.SET_PARAMS_PAYMENTS_SUSPENSE: {
      const { page, size } = action.payload;
      return state
        .setIn(['paramsPaymentSuspense', 'size'], size)
        .setIn(['paramsPaymentSuspense', 'page'], page);
    }

    // search invoices
    case types.SEARCH_INVOICES:
      return state.set('errorMsgInvoices', '');
    case types.SEARCH_INVOICES_SUCCESS:
      return state.set('invoices', action.payload);
    case types.SEARCH_INVOICES_FAILED:
      return state.set('errorMsgInvoices', action.payload);
    default:
      return state;
  }
}
