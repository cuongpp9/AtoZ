import * as types from './types';

export function getArOpsConfigByType(cb) {
  return {
    type: types.GET_AROPS_CONFIG_BY_TYPE,
    cb,
  };
}

export function updateArOpsConfigByType(payload, cb) {
  return {
    type: types.UPDATE_AROPS_CONFIG_BY_TYPE,
    payload,
    cb,
  };
}

// adjustments
export function searchAdjustments(payload, cb) {
  return {
    type: types.SEARCH_ADJUSTMENTS,
    payload,
    cb,
  };
}

export function searchAdjustmentsSuccess(payload) {
  return {
    type: types.SEARCH_ADJUSTMENTS_SUCCESS,
    payload,
  };
}

export function searchAdjustmentsFailure(payload) {
  return {
    type: types.SEARCH_ADJUSTMENTS_FAILURE,
    payload,
  };
}

export function setParamsAdjustments(payload) {
  return {
    type: types.SET_PARAMS_ADJUSTMENTS,
    payload,
  };
}

export function processAdjustment(payload, cb) {
  return {
    type: types.PROCESS_ADJUSTMENT,
    payload,
    cb,
  };
}

/**
 * action: getAdjustmentDetail
 * @param {*} payload: adjustment's id
 */
export function getAdjustmentDetail(payload) {
  return {
    type: types.GET_ADJUSTMENT_DETAIL,
    payload,
  };
}

/**
 * action: getAdjustmentDetailSuccess
 * @param {*} payload: response'data to reducer
 */
export function getAdjustmentDetailSuccess(payload) {
  return {
    type: types.GET_ADJUSTMENT_DETAIL_SUCCESS,
    payload,
  };
}

/**
 * action: getAdjustmentDetailFailed
 * @param {*} payload: error message when fetch adjustment detail failed
 */
export function getAdjustmentDetailFailed(payload) {
  return {
    type: types.GET_ADJUSTMENT_DETAIL_FAILED,
    payload,
  };
}

// disputes

export function searchDisputes(payload, cb) {
  return {
    type: types.SEARCH_DISPUTES,
    payload,
    cb,
  };
}

export function searchDisputesSuccess(payload) {
  return {
    type: types.SEARCH_DISPUTES_SUCCESS,
    payload,
  };
}

export function searchDisputesFailure(payload) {
  return {
    type: types.SEARCH_DISPUTES_FAILURE,
    payload,
  };
}

export function setParamsDisputes(payload) {
  return {
    type: types.SET_PARAMS_DISPUTES,
    payload,
  };
}

export function processDispute(payload, cb) {
  return {
    type: types.PROCESS_DISPUTE,
    payload,
    cb,
  };
}

/**
 * action: getDisputeDetail
 * @param {*} payload: dispute's id
 */
export function getDisputeDetail(payload) {
  return {
    type: types.GET_DISPUTE_DETAIL,
    payload,
  };
}

/**
 * action: getDisputeDetailSuccess
 * @param {*} payload: response'data to reducer
 */
export function getDisputeDetailSuccess(payload) {
  return {
    type: types.GET_DISPUTE_DETAIL_SUCCESS,
    payload,
  };
}

/**
 * action: getDisputeDetailFailed
 * @param {*} payload: error message when fetch dispute detail failed
 */
export function getDisputeDetailFailed(payload) {
  return {
    type: types.GET_DISPUTE_DETAIL_FAILED,
    payload,
  };
}

export function processSettlement(payload, cb) {
  return {
    type: types.PROCESS_SETTLEMENT,
    payload,
    cb,
  };
}

// write-offs
export function searchWriteOffs(payload, cb) {
  return {
    type: types.SEARCH_WRITE_OFFS,
    payload,
    cb,
  };
}

export function searchWriteOffsSuccess(payload) {
  return {
    type: types.SEARCH_WRITE_OFFS_SUCCESS,
    payload,
  };
}

export function searchWriteOffsFailure(payload) {
  return {
    type: types.SEARCH_WRITE_OFFS_FAILURE,
    payload,
  };
}

export function setParamsWriteOffs(payload) {
  return {
    type: types.SET_PARAMS_WRITE_OFFS,
    payload,
  };
}

/**
 * action: getWriteOffDetail
 * @param {*} payload: dispute's id
 */
export function getWriteOffDetail(payload) {
  return {
    type: types.GET_WRITE_OFFS_DETAIL,
    payload,
  };
}

/**
 * action: getWriteOffDetailSuccess
 * @param {*} payload: response'data to reducer
 */
export function getWriteOffDetailSuccess(payload) {
  return {
    type: types.GET_WRITE_OFFS_DETAIL_SUCCESS,
    payload,
  };
}

/**
 * action: getDisputeDetailFailed
 * @param {*} payload: error message when fetch dispute detail failed
 */
export function getWriteOffDetailFailed(payload) {
  return {
    type: types.GET_WRITE_OFFS_DETAIL_FAILED,
    payload,
  };
}

/**
 * @param {*} payload data to apply write off
 * @param {*} cb return end loading
 */
export function processWriteoff(payload, cb) {
  return {
    type: types.PROCESS_WRITE_OFF,
    payload,
    cb,
  };
}

/**
 * @param {*} payload data to reverse write off
 * @param {*} cb return end loading
 */
export function processWriteoffReversal(payload, cb) {
  return {
    type: types.PROCESS_REVERSE_WRITE_OFF,
    payload,
    cb,
  };
}
