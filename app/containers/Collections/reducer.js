import { fromJS } from 'immutable';
import * as types from './types';

export const initialState = fromJS({
  isFetchingSuccess: false,
  listCollectionUnits: [],
  errorMessageCollectionUnits: '',
  listInvoiceUnits: [],
  errorMessageInvoiceUnits: '',
  paramInvoiceUnits: {
    page: 1,
    size: 20,
    filter: {},
    sort: {},
  },
  listAccounts: [],
  errorMessageAccounts: '',
  paramAccounts: {
    page: 1,
    size: 20,
    filter: {},
    sort: {},
  },
  paramAgentActivity: {
    page: 1,
    size: 20,
  },
  errorAgentActivityMessage: '',
  agentActivities: [],
  listHistorys: [],
  errorMessageHistory: '',
  collectionHistoryDetail: {},
  paramHistory: {
    page: 1,
    size: 20,
  },
});

export default function(state = initialState, action) {
  switch (action.type) {
    // collection units
    case types.SEARCH_COLLECTION_UNITS:
      return state
        .set('errorMessageCollectionUnits', '')
        .set('isFetchingSuccess', false);
    case types.SEARCH_COLLECTION_UNITS_SUCCESS:
      return state
        .set('listCollectionUnits', action.payload)
        .set('isFetchingSuccess', true);
    case types.SEARCH_COLLECTION_UNITS_FAILURE:
      return state.set('errorMessageCollectionUnits', action.payload);
    // invoice units in collection
    case types.SEARCH_INVOICE_IN_COLLECTION:
      return state.set('errorMessageInvoiceUnits', '');
    case types.SEARCH_INVOICE_IN_COLLECTION_SUCCESS:
      return state.set('listInvoiceUnits', action.payload);
    case types.SEARCH_INVOICE_IN_COLLECTION_FAILED:
      return state.set('errorMessageInvoiceUnits', action.payload);
    case types.SET_PARAMS_INVOICE_UNITS: {
      const { page, size } = action.payload;
      return state
        .setIn(['paramInvoiceUnits', 'size'], size)
        .setIn(['paramInvoiceUnits', 'page'], page);
    }
    // accounts collection
    case types.SEARCH_ACCOUNTS_COLLECTION:
      return state
        .set('errorMessageAccounts', '')
        .set('isFetchingSuccess', false);
    case types.SEARCH_ACCOUNTS_COLLECTION_SUCCESS:
      return state
        .set('listAccounts', action.payload)
        .set('isFetchingSuccess', true);
    case types.SEARCH_ACCOUNTS_COLLECTION_FAILURE:
      return state.set('errorMessageAccounts', action.payload);
    case types.SET_PARAMS_ACCOUNTS_COLLECTION: {
      const { page, size } = action.payload;
      return state
        .setIn(['paramAccounts', 'size'], size)
        .setIn(['paramAccounts', 'page'], page);
    }
    // collection history
    case types.SEARCH_COLLECTION_HISTORY:
      return state
        .set('errorMessageHistory', '')
        .set('isFetchingSuccess', false);
    case types.SEARCH_COLLECTION_HISTORY_SUCCESS:
      return state
        .set(
          'listHistorys',
          action.payload && action.payload.length > 0 ? action.payload : [],
        )
        .set('isFetchingSuccess', true);
    case types.SEARCH_COLLECTION_HISTORY_FAILURE:
      return state.set('errorMessageHistory', action.payload);
    case types.SET_PARAMS_COLLECTION_HISTORY: {
      const { page, size } = action.payload;
      return state
        .setIn(['paramHistory', 'size'], size)
        .setIn(['paramHistory', 'page'], page);
    }
    // for search collection agent activity
    case types.SEARCH_COLLECTION_AGENT_ACTIVITY:
      return state.set('errorAgentActivityMessage', '');
    case types.SEARCH_COLLECTION_AGENT_ACTIVITY_SUCCESS:
      return state.set('agentActivities', action.payload);
    case types.SEARCH_COLLECTION_AGENT_ACTIVITY_FAILURE:
      return state.set('errorAgentActivityMessage', action.payload);
    case types.SET_PARAMS_COLLECTION_AGENT_ACTIVITY: {
      const { page, size } = action.payload;
      return state
        .setIn(['paramAgentActivity', 'size'], size)
        .setIn(['paramAgentActivity', 'page'], page);
    }
    // for getCollectionUnitsById
    case types.GET_COLLECTION_UNITS_BY_ID:
      return state
        .set('errorMessageHistory', '')
        .set('collectionHistoryDetail', {});
    case types.GET_COLLECTION_UNITS_BY_ID_SUCCESS:
      return state.set('collectionHistoryDetail', action.payload);
    case types.GET_COLLECTION_UNITS_BY_ID_FAILED:
      return state.set('errorMessageHistory', action.payload);
    default:
      return state;
  }
}
