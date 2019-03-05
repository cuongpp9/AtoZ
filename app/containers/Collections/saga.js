import { call, put, takeLatest } from 'redux-saga/effects';
// import { push } from 'react-router-redux';
import { queryRequest, mutationRequest } from 'utils/request';
import { 
  searchAccountsCollection,
   searchCollectionHistory, 
   getCollectionActionsByType, 
   getCollectionScheduleByType, 
   getCollectionAgentByType,
   createCollectionAction,
   modifyCollectionAction,
   createCollectionAgent,
   modifyCollectionAgent,
   createCollectionSchedule,
   modifyCollectionSchedule,
   searchCollectionAgentActivity,
   reassignCollectionAgent,
   getCollectionUnitsById,
   searchInvoiceUnitsInCollection,
   createCollectionUnit,
   modifyCollectionUnit,
   } from 'api';
import {
  resetNotification,
  setNotification,
} from 'containers/Notification/actions';
import { NotificationTypes } from 'constantsApp';
import { isConnecting, isEndConnected } from '../Loader/actions';
import * as types from './types';
import * as actions from './actions';

// ------ search account collection
export function* searchAccountsInCollectionSaga({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter,sort  } = payload;
    const response = yield call(
      queryRequest,
      searchAccountsCollection({ page, size, filter,sort  }),
    );
    if (response.searchAccountsInCollection) {
      yield put(
        actions.searchAccountsCollectionSuccess(
          response.searchAccountsInCollection,
        ),
      );
    } else {
      yield put(
        actions.searchAccountsCollectionFailure(
          'Failed to fetch accounts. Please try again or check your network!',
        ),
      );
    }
    yield put(isEndConnected());
    if (cb) cb();
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.searchAccountsCollectionFailure(
        'Failed to fetch accounts. Please try again or check your network!',
      ),
    );
    if (cb) cb();
  }
}

// ------ search collection history
export function* searchListHistorySaga({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter,sort } = payload;
    const response = yield call(
      queryRequest,
      searchCollectionHistory({ page, size, filter,sort  }),
    );
    if (response.searchCollectionHistory) {
      yield put(
        actions.searchCollectionHistorySuccess(
          response.searchCollectionHistory,
        ),
      );
    } else {
      yield put(
        actions.searchAccountsCollectionFailure(
          'Failed to fetch history. Please try again or check your network!',
        ),
      );
    }
    yield put(isEndConnected());
    if (cb) cb();
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.searchCollectionHistoryFailure(
        'Failed to fetch history. Please try again or check your network!',
      ),
    );
    if (cb) cb();
  }
}

export function* getCollectionActionsByTypeSaga({ payload, cb }) {

  yield put(isConnecting());
  yield put(resetNotification());
  
  try {
    const response = yield call(queryRequest, getCollectionActionsByType(payload));
    yield cb(response);
    yield put(isEndConnected());
    
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `get actions failure <br> ${err}`,
      }),
    );
    cb([]);
  }
}

export function* getCollectionScheduleByTypeSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  
  try {
    
    const response = yield call(queryRequest, getCollectionScheduleByType(payload));
    yield cb(response);
    yield put(isEndConnected());
    
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `get actions failure <br> ${err}`,
      }),
    );
    cb();
  }
}


export function* getCollectionAgentByTypeSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  
  try {
    
    const response = yield call(queryRequest, getCollectionAgentByType(payload));
    yield cb(response);
    yield put(isEndConnected());
    
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `get actions failure <br> ${err}`,
      }),
    );
    cb();
  }
}

//
export function* createCollectionActionSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataProcess = payload;
    const response = yield call(
      mutationRequest,
      createCollectionAction(dataProcess),
    );
    if(cb) cb(response)
    yield put(isEndConnected());
  
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'create Collection Action successfully!',
      }),
    );
  } catch (err) {
  
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `create Collection Action failed! <br> ${err}`,
      }),
    );
   
  }
}

export function* modifyCollectionActionSaga({ payload, cb }) {
 
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataProcess = payload;
    const response = yield call(
      mutationRequest,
      modifyCollectionAction(dataProcess),
    );
    if(cb) cb(response)
    yield put(isEndConnected());
  
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'modify Collection Action successfully!',
      }),
    );
  } catch (err) {
  
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `modify Collection Action failed! <br> ${err}`,
      }),
    );
   
  }
}

export function* createCollectionAgentSaga({ payload, cb }) {
 
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataProcess = payload;
    const response = yield call(
      mutationRequest,
      createCollectionAgent(dataProcess),
    );
    if(cb) cb(response)
    yield put(isEndConnected());
  
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'create Collection Agent successfully!',
      }),
    );
  } catch (err) {
  
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `create Collection Agent failed! <br> ${err}`,
      }),
    );
   
  }
}


export function* modifyCollectionAgentSaga({ payload, cb }) {
 
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataProcess = payload;
    const response = yield call(
      mutationRequest,
      modifyCollectionAgent(dataProcess),
    );
   
    if(cb) cb((response || {} ))
    yield put(isEndConnected());
  
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'modify Collection Agent successfully!',
      }),
    );
  } catch (err) {
  
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `modify Collection Agent failed! <br> ${err}`,
      }),
    );
   
  }
}

//
export function* createCollectionScheduleSaga({ payload, cb }) {
 
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataProcess = payload;
    const response = yield call(
      mutationRequest,
      createCollectionSchedule(dataProcess),
    );
    if(cb) cb(response)
    yield put(isEndConnected());
  
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'create Collection Schedule successfully!',
      }),
    );
  } catch (err) {
  
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `create Collection Schedule failed! <br> ${err}`,
      }),
    );
   
  }
}

export function* modifyCollectionScheduleSaga({ payload, cb }) {
 
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataProcess = payload;
    const response = yield call(
      mutationRequest,
      modifyCollectionSchedule(dataProcess),
    );
   
    if(cb) cb((response || {} ))
    yield put(isEndConnected());
  
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'modify Collection Schedule successfully!',
      }),
    );
  } catch (err) {
  
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `modify Collection Schedule failed! <br> ${err}`,
      }),
    );
   
  }
}

// ------ search collection agent activity
export function* searchCollectionAgentActivitySaga({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size  } = payload;
    const response = yield call(
      queryRequest,
      searchCollectionAgentActivity({ page, size }),
    );
    if (response.searchCollectionAgentActivity) {
      yield put(
        actions.searchCollectionAgentActivitySuccess(
          response.searchCollectionAgentActivity,
        ),
      );
    } else {
      yield put(
        actions.searchCollectionAgentActivityFailure(
          'Failed to fetch collection agent activity. Please try again or check your network!',
        ),
      );
    }
    yield put(isEndConnected());
    if (cb) cb();
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.searchCollectionAgentActivityFailure(
        'Failed to fetch acccollection agent activityounts. Please try again or check your network!',
      ),
    );
    if (cb) cb();
  }
}

export function* reassignCollectionAgentSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataProcess = payload;
    const response = yield call(
      mutationRequest,
      reassignCollectionAgent(dataProcess),
    );
    console.log('reassignCollectionAgentSaga', response);
    if(cb) cb({ success: true });
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'Reassign Collection Agent successfully!',
      }),
    );
  } catch (err) {
    if(cb) cb({ success: false });
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Reassign Collection Agent failed! <br> ${err}`,
      }),
    );
   
  }
}

// getCollectionUnitsById
export function* getCollectionUnitsSaga({ payload }) {
  yield put(isConnecting());
  try {
    const response = yield call(
      queryRequest,
      getCollectionUnitsById(payload),
    );

    if (response.getCollectionUnitsById) {
      yield put(
        actions.getCollectionUnitsByIdSuccess(
          response.getCollectionUnitsById,
        ),
      );
    } else {
      yield put(
        actions.getCollectionUnitsByIdFailed(
          `Can not get collection history detail for ${payload}`,
        ),
      );
    }
    yield put(isEndConnected());
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.getCollectionUnitsByIdFailed(
        `Can not get collection history detail for ${payload}`,
      ),
    );
  }
}

// ------ search invoice units in collection
export function* searchInvoiceInCollectionSaga({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter,sort } = payload;
    const response = yield call(
      queryRequest,
      searchInvoiceUnitsInCollection({ page, size, filter,sort  }),
    );
    if (response.searchInvoiceUnitsInCollection) {
     
      yield put(
        actions.searchInvoiceInCollectionSuccess(
          response.searchInvoiceUnitsInCollection,
        ),
      );
    } else {
      yield put(
        actions.searchInvoiceInCollectionFailed(
          'Failed to fetch invoice units. Please try again or check your network!',
        ),
      );
    }
    yield put(isEndConnected());
    if (cb) cb();
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.searchInvoiceInCollectionFailed(
        'Failed to fetch invoice units. Please try again or check your network!',
      ),
    );
    if (cb) cb();
  }
}

export function* createCollectionUnitSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataProcess = payload;
    const response = yield call(
      mutationRequest,
      createCollectionUnit(dataProcess),
    );
    if(cb) cb({ success: true });
    yield put(isEndConnected());
  
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'Collection Unit created successfully!',
      }),
    );
  } catch (err) {
    if(cb) cb({ success: false });
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Collection Unit created failed! <br> ${err}`,
      }),
    );
  }
}

export function* modifyCollectionUnitSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataProcess = payload;
    const response = yield call(
      mutationRequest,
      modifyCollectionUnit(dataProcess),
    );
    if(cb) cb({ success: true });
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'Collection Unit modified successfully!',
      }),
    );
  } catch (err) {
    cb({ success: false });
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Collection Unit modified failed! <br> ${err}`,
      }),
    );
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* collectionsSaga() {
  yield takeLatest(types.SEARCH_ACCOUNTS_COLLECTION, searchAccountsInCollectionSaga);
  yield takeLatest(types.SEARCH_COLLECTION_HISTORY, searchListHistorySaga);
  yield takeLatest(types.GET_COLLECTION_BY_TYPE, getCollectionActionsByTypeSaga);
  yield takeLatest(types.GET_COLLECTION_SCHEDULE_BY_TYPE, getCollectionScheduleByTypeSaga);
  yield takeLatest(types.GET_COLLECTION_AGENT_BY_TYPE, getCollectionAgentByTypeSaga);
  yield takeLatest (types.CREATE_COLLECTION_ACTION, createCollectionActionSaga)
  yield takeLatest (types.MODIFY_COLLECTION_ACTION, modifyCollectionActionSaga)
  yield takeLatest (types.CREATE_COLLECTION_AGENT, createCollectionAgentSaga)
  yield takeLatest (types.MODIFY_COLLECTION_AGENT, modifyCollectionAgentSaga)
  yield takeLatest (types.CREATE_COLLECTION_SCHEDULE, createCollectionScheduleSaga)
  yield takeLatest (types.MODIFY_COLLECTION_SCHEDULE, modifyCollectionScheduleSaga)
  yield takeLatest (types.SEARCH_COLLECTION_AGENT_ACTIVITY, searchCollectionAgentActivitySaga)
  yield takeLatest (types.REASSIGN_COLLECTION_AGENT, reassignCollectionAgentSaga)
  yield takeLatest (types.GET_COLLECTION_UNITS_BY_ID, getCollectionUnitsSaga)
  yield takeLatest (types.SEARCH_INVOICE_IN_COLLECTION, searchInvoiceInCollectionSaga)
  yield takeLatest (types.CREATE_COLLECTION_UNIT, createCollectionUnitSaga)
  yield takeLatest (types.MODIFY_COLLECTION_UNIT, modifyCollectionUnitSaga)
}
