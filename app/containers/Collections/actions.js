import * as types from './types';

export function getCollectionActionsByType(payload, cb) {
  return {
    type: types.GET_COLLECTION_BY_TYPE,
    payload,
    cb,
  };
}
export function getCollectionActionsByTypeSuccess(payload, cb) {
  return {
    type: types.GET_COLLECTION_BY_TYPE_SUCCESS,
    payload,
    cb,
  };
}

export function getCollectionActionsByTypeFailure(payload) {
  return {
    type: types.GET_COLLECTION_BY_TYPE_FAILURE,
    payload,
  };
}

export function getCollectionScheduleByType(payload, cb) {
  return {
    type: types.GET_COLLECTION_SCHEDULE_BY_TYPE,
    payload,
    cb,
  };
}
export function getCollectionAgentByType(payload, cb) {
  return {
    type: types.GET_COLLECTION_AGENT_BY_TYPE,
    payload,
    cb,
  };
}
export function searchCollectionUnits(payload, cb) {
  return {
    type: types.SEARCH_COLLECTION_UNITS,
    payload,
    cb,
  };
}

export function searchCollectionUnitsSuccess(payload) {
  return {
    type: types.SEARCH_COLLECTION_UNITS_SUCCESS,
    payload,
  };
}

export function searchCollectionUnitsFailure(payload) {
  return {
    type: types.SEARCH_COLLECTION_UNITS_FAILURE,
    payload,
  };
}

export function searchAccountsCollection(payload, cb) {
  return {
    type: types.SEARCH_ACCOUNTS_COLLECTION,
    payload,
    cb,
  };
}

export function searchAccountsCollectionSuccess(payload) {
  return {
    type: types.SEARCH_ACCOUNTS_COLLECTION_SUCCESS,
    payload,
  };
}

export function searchAccountsCollectionFailure(payload) {
  return {
    type: types.SEARCH_ACCOUNTS_COLLECTION_FAILURE,
    payload,
  };
}

export function setParamsAccountsCollection(payload) {
  return {
    type: types.SET_PARAMS_ACCOUNTS_COLLECTION,
    payload,
  };
}

export function searchCollectionHistory(payload, cb) {
  return {
    type: types.SEARCH_COLLECTION_HISTORY,
    payload,
    cb,
  };
}

export function searchCollectionHistorySuccess(payload) {
  return {
    type: types.SEARCH_COLLECTION_HISTORY_SUCCESS,
    payload,
  };
}

export function searchCollectionHistoryFailure(payload) {
  return {
    type: types.SEARCH_COLLECTION_HISTORY_FAILURE,
    payload,
  };
}

export function setParamsCollectionHistory(payload) {
  return {
    type: types.SET_PARAMS_COLLECTION_HISTORY,
    payload,
  };
}

export function createCollectionAction(payload, cb) {
  return {
    type: types.CREATE_COLLECTION_ACTION,
    payload,
    cb,
  };
}
export function modifyCollectionAction(payload, cb) {
  return {
    type: types.MODIFY_COLLECTION_ACTION,
    payload,
    cb,
  };
}

export function createCollectionAgent(payload, cb) {
  return {
    type: types.CREATE_COLLECTION_AGENT,
    payload,
    cb,
  };
}
export function modifyCollectionAgent(payload, cb) {
  return {
    type: types.MODIFY_COLLECTION_AGENT,
    payload,
    cb,
  };
}

export function createCollectionSchedule(payload, cb) {
  return {
    type: types.CREATE_COLLECTION_SCHEDULE,
    payload,
    cb,
  };
}
export function modifyCollectionSchedule(payload, cb) {
  return {
    type: types.MODIFY_COLLECTION_SCHEDULE,
    payload,
    cb,
  };
}

export function searchCollectionAgentActivity(payload, cb) {
  return {
    type: types.SEARCH_COLLECTION_AGENT_ACTIVITY,
    payload,
    cb,
  };
}

export function searchCollectionAgentActivitySuccess(payload) {
  return {
    type: types.SEARCH_COLLECTION_AGENT_ACTIVITY_SUCCESS,
    payload,
  };
}

export function searchCollectionAgentActivityFailure(payload) {
  return {
    type: types.SEARCH_COLLECTION_AGENT_ACTIVITY_FAILURE,
    payload,
  };
}

export function setParamsCollectionAgentActivity(payload) {
  return {
    type: types.SET_PARAMS_COLLECTION_AGENT_ACTIVITY,
    payload,
  };
}

export function reassignCollectionAgent(payload, cb) {
  return {
    type: types.REASSIGN_COLLECTION_AGENT,
    payload,
    cb,
  };
}

/**
 * getCollectionUnitsById
 * @param {*} payload : id
 */
export function getCollectionUnitsById(payload) {
  return {
    type: types.GET_COLLECTION_UNITS_BY_ID,
    payload,
  };
}

/**
 * getCollectionUnitsByIdSuccess
 * @param {*} payload : response data
 */
export function getCollectionUnitsByIdSuccess(payload) {
  return {
    type: types.GET_COLLECTION_UNITS_BY_ID_SUCCESS,
    payload,
  };
}

/**
 * getCollectionUnitsByIdFailed
 * @param {*} payload : error message
 */
export function getCollectionUnitsByIdFailed(payload) {
  return {
    type: types.GET_COLLECTION_UNITS_BY_ID_FAILED,
    payload,
  };
}

/**
 * searchInvoiceInCollection
 * @param {*} payload : page, size, filter, sort
 */
export function searchInvoiceInCollection(payload) {
  return {
    type: types.SEARCH_INVOICE_IN_COLLECTION,
    payload,
  };
}

/**
 * searchInvoiceInCollectionSuccess
 * @param {*} payload : response data
 */
export function searchInvoiceInCollectionSuccess(payload) {
  return {
    type: types.SEARCH_INVOICE_IN_COLLECTION_SUCCESS,
    payload,
  };
}

/**
 * searchInvoiceInCollectionFailed
 * @param {*} payload : error message
 */
export function searchInvoiceInCollectionFailed(payload) {
  return {
    type: types.SEARCH_INVOICE_IN_COLLECTION_FAILED,
    payload,
  };
}

export function setParamsInvoiceInCollection(payload) {
  return {
    type: types.SET_PARAMS_INVOICE_UNITS,
    payload,
  };
}

/**
 * createCollectionUnit
 * @param {*} payload : request payload
 * @param {*} cb : callback function
 */
export function createCollectionUnit(payload, cb) {
  return {
    type: types.CREATE_COLLECTION_UNIT,
    payload,
    cb,
  };
}

/**
 * modifyCollectionUnit
 * @param {*} payload : request payload
 * @param {*} cb : callback function
 */
export function modifyCollectionUnit(payload, cb) {
  return {
    type: types.MODIFY_COLLECTION_UNIT,
    payload,
    cb,
  };
}
