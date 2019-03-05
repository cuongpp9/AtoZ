import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { queryRequest, mutationRequest } from 'utils/request';
import {
  getArOpsConfigByType,
  updateArOpsConfigByType,
  searchAdjustments,
  processAdjustment,
  searchDisputes,
  processDispute,
  processSettlement,
  searchWriteOffs,
  getDisputeById,
  getWriteoffById,
  processWriteoffReversal,
  processWriteoff,
  getAdjustmentById,
} from 'api';
import {
  resetNotification,
  setNotification,
} from 'containers/Notification/actions';
import { NotificationTypes } from 'constantsApp';
import { isConnecting, isEndConnected } from '../Loader/actions';
import * as types from './types';
import * as actions from './actions';

export function* getArOpsConfigSaga({ cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  
  try {
    const response = yield call(queryRequest, getArOpsConfigByType());
    yield cb(response && response.getArOpsConfigByType);
    yield put(isEndConnected());
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `get ArOps Config failure <br> ${err}`,
      }),
    );
    cb([]);
  }
}

export function* updateArOpsConfigByTypeSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataProcess = payload;
    const response = yield call(
      mutationRequest,
      updateArOpsConfigByType(dataProcess),
    );
    if(cb) cb(response ? response.updateArOpsConfigByType : null )
    yield put(isEndConnected());
  
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'update ArOps Config successfully!',
      }),
    );
  } catch (err) {
  
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `update ArOps Config failed! <br> ${err}`,
      }),
    );
   
  }
}
// ------ adjustments
export function* searchListAdjustmentsSaga({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter, sort } = payload;
    const response = yield call(
      queryRequest,
      searchAdjustments({ page, size, filter, sort }),
    );
    if (response.searchAdjustments) {
      yield put(actions.searchAdjustmentsSuccess(response.searchAdjustments));
    } else {
      yield put(
        actions.searchAdjustmentsFailure(
          'Failed to fetch adjustments. Please try again or check your network!',
        ),
      );
    }

    yield put(isEndConnected());
    if (cb) cb();
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.searchAdjustmentsFailure(
        'Failed to fetch adjustments. Please try again or check your network!',
      ),
    );
    if (cb) cb();
  }
}

export function* processAdjustmentSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataProcess = payload;
    const response = yield call(
      mutationRequest,
      processAdjustment(dataProcess),
    );

    yield put(push(`/ar-operations/adjustments/${response.processAdjustment.id}/detail`));
    yield cb();
    yield put(isEndConnected());
    // yield put(push(`/customers/${response.processAdjustment.id}/info`));
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'Apply Adjustment successfully!',
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Apply Adjustment failed! <br> ${err}`,
      }),
    );
    cb();
  }
}

/**
 * getAdjustmentDetailSaga
 * @param {*} payload: Adjustment's id 
 */
export function* getAdjustmentDetailSaga({ payload }) {
  yield put(isConnecting());
  try {
    const response = yield call(queryRequest, getAdjustmentById(payload));
    if (response.getAdjustmentById) {
      yield put(actions.getAdjustmentDetailSuccess(response.getAdjustmentById));
    } else {
      yield put(
        actions.getAdjustmentDetailFailed(
          `Can not get Adjustment Info for ${payload}`,
        ),
      );
    }
    yield put(isEndConnected());
  } catch (err) {
    yield put(
      actions.getAdjustmentDetailFailed(
        handleError(err, `Can not get Adjustment Info for ${payload}`),
      ),
    );
    yield put(isEndConnected());
  }
}

// ------ disputes
export function* searchListDisputesSaga({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter, sort } = payload;
    const response = yield call(
      queryRequest,
      searchDisputes({ page, size, filter, sort }),
    );
    if (response.searchDisputes) {
      yield put(actions.searchDisputesSuccess(response.searchDisputes));
    } else {
      yield put(
        actions.searchDisputesFailure(
          'Failed to fetch disputes. Please try again or check your network!',
        ),
      );
    }
    yield put(isEndConnected());
    if (cb) cb();
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.searchDisputesFailure(
        'Failed to fetch disputes. Please try again or check your network!',
      ),
    );
    if (cb) cb();
  }
}

/**
 * getDisputeSaga
 * @param {*} payload: dispute's id 
 */
export function* getDisputeSaga({ payload }) {
  yield put(isConnecting());
  try {
    const response = yield call(queryRequest, getDisputeById(payload));
    if (response.getDisputeById) {
      yield put(actions.getDisputeDetailSuccess(response.getDisputeById));
    } else {
      yield put(
        actions.getDisputeDetailFailed(
          `Can not get Dispute Info for ${payload}`,
        ),
      );
    }
    yield put(isEndConnected());
  } catch (err) {
    yield put(
      actions.getDisputeDetailFailed(
        handleError(err, `Can not get Dispute Info for ${payload}`),
      ),
    );
    yield put(isEndConnected());
  }
}

export function* processDisputeSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataProcess = payload;
    const response = yield call(mutationRequest, processDispute(dataProcess));
    yield cb();
    yield put(isEndConnected());
    yield put(push(`/ar-operations/disputes/${response.processDispute.id}/detail`));
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'Apply Dispute successfully!',
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Apply Dispute failed! <br> ${err}`,
      }),
    );
    cb();
  }
}

export function* processSettlementSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataProcess = payload;
    const response = yield call(
      mutationRequest,
      processSettlement(dataProcess),
    );
    yield cb();
    yield put(isEndConnected());
    yield put(push(`/ar-operations/disputes/${response.processSettlement.id}/detail`));
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'Settle a Dispute successfully!',
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Settle a Dispute failed! <br> ${err}`,
      }),
    );
    cb();
  }
}

// ------ write-offs
export function* searchListWriteOffsSaga({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter, sort } = payload;
    const response = yield call(
      queryRequest,
      searchWriteOffs({ page, size, filter, sort }),
    );
    if (response.searchWriteoffs) {
      yield put(actions.searchWriteOffsSuccess(response.searchWriteoffs));
    } else {
      yield put(
        actions.searchWriteOffsFailure(
          'Failed to fetch disputes. Please try again or check your network!',
        ),
      );
    }
    yield put(isEndConnected());
    if (cb) cb();
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.searchWriteOffsFailure(
        'Failed to fetch disputes. Please try again or check your network!',
      ),
    );
    if (cb) cb();
  }
}

export function* getWriteOffDetailSaga({ payload }) {
  yield put(isConnecting());
  try {
    const response = yield call(queryRequest, getWriteoffById(payload));
    if (response.getWriteoffById) {
      yield put(actions.getWriteOffDetailSuccess(response.getWriteoffById));
    } else {
      yield put(
        actions.getWriteOffDetailFailed(
          `Can not get write-offs Info for ${payload}`,
        ),
      );
    }
    yield put(isEndConnected());
  } catch (err) {
    yield put(
      actions.getWriteOffDetailFailed(
        handleError(err, `Can not get write-off Info for ${payload}`),
      ),
    );
    yield put(isEndConnected());
  }
}

export function* processWriteoffReversalOffSaga({ payload, cb }) {
 
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataProcess = payload;
    const response = yield call(
      mutationRequest,
      processWriteoffReversal(dataProcess),
    );
    yield cb();
    yield put(isEndConnected());
    yield put(push(`/ar-operations/write-offs/${response.processWriteoffReversal.id}/detail`));
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'reverse Write-off successfully!',
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `reverse Write-off failed! <br> ${err}`,
      }),
    );
    cb();
  }
}

export function* processWriteoffSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataProcess = payload;
    const response = yield call(mutationRequest, processWriteoff(dataProcess));
    yield cb();
    yield put(isEndConnected());
    yield put(push(`/ar-operations/write-offs/${response.processWriteoff.id}/detail`));
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'Apply Write off successfully!',
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Apply Write off failed! <br> ${err}`,
      }),
    );
    cb();
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* arOperationsSaga() {
  
  yield takeLatest(types.UPDATE_AROPS_CONFIG_BY_TYPE, updateArOpsConfigByTypeSaga);
  yield takeLatest(types.GET_AROPS_CONFIG_BY_TYPE, getArOpsConfigSaga);
  yield takeLatest(types.SEARCH_ADJUSTMENTS, searchListAdjustmentsSaga);
  yield takeLatest(types.SEARCH_DISPUTES, searchListDisputesSaga);
  yield takeLatest(types.SEARCH_WRITE_OFFS, searchListWriteOffsSaga);

  yield takeLatest(types.PROCESS_ADJUSTMENT, processAdjustmentSaga);
  yield takeLatest(types.PROCESS_DISPUTE, processDisputeSaga);
  yield takeLatest(types.PROCESS_SETTLEMENT, processSettlementSaga);
  yield takeLatest(types.GET_DISPUTE_DETAIL, getDisputeSaga);

  yield takeLatest(types.GET_WRITE_OFFS_DETAIL, getWriteOffDetailSaga);
  yield takeLatest(types.PROCESS_REVERSE_WRITE_OFF, processWriteoffReversalOffSaga);
  yield takeLatest(types.PROCESS_WRITE_OFF, processWriteoffSaga);
  yield takeLatest(types.GET_ADJUSTMENT_DETAIL, getAdjustmentDetailSaga);

}
