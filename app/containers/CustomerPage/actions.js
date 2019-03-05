import * as types from './types';

export function getCustomers(payload, cb) {
  return {
    type: types.GET_CUSTOMERS,
    payload,
    cb,
  };
}

export function getCustomersId(payload, cb) {
  return {
    type: types.GET_CUSTOMERS_ID,
    payload,
    cb,
  };
}

export function getCustomersSuccess(payload) {
  return {
    type: types.GET_CUSTOMERS_SUCCESS,
    payload,
  };
}

export function getCustomersFailure(payload) {
  return {
    type: types.GET_CUSTOMERS_FAILURE,
    payload,
  };
}

export function setParams(payload) {
  return {
    type: types.SET_PARAMS,
    payload,
  };
}

//----------

export function createAccount(payload, cb) {
  return {
    type: types.CREATE_ACCOUNT,
    payload,
    cb,
  };
}

export function createAccountSuccess() {
  return {
    type: types.CREATE_ACCOUNT_SUCCESS,
  };
}

export function createAccountFailure(payload) {
  return {
    type: types.CREATE_ACCOUNT_FAILURE,
    payload,
  };
}

// for get Account Detail
export function getAccountDetail(payload) {
  return {
    type: types.GET_ACCOUNT_DETAIL,
    payload,
  };
}

export function getAccountDetailSuccess(payload) {
  return {
    type: types.GET_ACCOUNT_DETAIL_SUCCESS,
    payload,
  };
}

export function getAccountDetailFailure(payload) {
  return {
    type: types.GET_ACCOUNT_DETAIL_FAILURE,
    payload,
  };
}

// for modify account
export function modifyAccount(payload, cb) {
  return {
    type: types.MODIFY_ACCOUNT,
    payload,
    cb,
  };
}

export function modifyAccountSuccess(payload) {
  return {
    type: types.MODIFY_ACCOUNT_SUCCESS,
    payload,
  };
}

// for update account's status
export function updateAccountStatus(payload, cb) {
  return {
    type: types.UPDATE_ACCOUNT_STATUS,
    payload,
    cb,
  };
}

export function updateAccountStatusSuccess(payload) {
  return {
    type: types.UPDATE_ACCOUNT_STATUS_SUCCESS,
    payload,
  };
}

// for get price units
export function getPriceUnits(payload) {
  return {
    type: types.GET_PRICE_UNITS,
    payload,
  };
}

export function getPriceUnitsSuccess(payload) {
  return {
    type: types.GET_PRICE_UNITS_SUCCESS,
    payload,
  };
}

export function getPriceUnitsFailure(payload) {
  return {
    type: types.GET_PRICE_UNITS_FAILURE,
    payload,
  };
}

// for get service units by accountId
export function getServiceUnitAc(payload) {
  return {
    type: types.GET_SERVICE_UNITS_AC,
    payload,
  };
}

export function getServiceUnitAcSuccess(payload) {
  return {
    type: types.GET_SERVICE_UNITS_AC_SUCCESS,
    payload,
  };
}

export function getServiceUnitAcFailure(payload) {
  return {
    type: types.GET_SERVICE_UNITS_AC_FAILURE,
    payload,
  };
}

// for get subscription
export function getSubscription(payload) {
  return {
    type: types.GET_SUBSCRIPTION,
    payload,
  };
}

export function getSubscriptionSuccess(payload) {
  return {
    type: types.GET_SUBSCRIPTION_SUCCESS,
    payload,
  };
}

export function getSubscriptionFailure(payload) {
  return {
    type: types.GET_SUBSCRIPTION_FAILURE,
    payload,
  };
}
// for get balance units
export function getBalanceUnit(payload) {
  return {
    type: types.GET_BALANCE_UNIT,
    payload,
  };
}

export function getBalanceUnitSuccess(payload) {
  return {
    type: types.GET_BALANCE_UNIT_SUCCESS,
    payload,
  };
}

export function getBalanceUnitFailure(payload) {
  return {
    type: types.GET_BALANCE_UNIT_FAILURE,
    payload,
  };
}

// for get transaction unit
export function getTransactionUnit(payload, cb) {
  return {
    type: types.GET_TRANSACTION_UNIT,
    payload,
    cb,
  };
}

export function getTransactionUnitSuccess(payload) {
  return {
    type: types.GET_TRANSACTION_UNIT_SUCCESS,
    payload,
  };
}

export function getTransactionUnitFailure(payload) {
  return {
    type: types.GET_TRANSACTION_UNIT_FAILURE,
    payload,
  };
}

export function setTransactionParams(payload) {
  return {
    type: types.SET_TRANSACTION_PARAMS,
    payload,
  };
}

// for get bill unit
export function getBillUnit(payload, cb) {
  return {
    type: types.GET_BILL_UNIT,
    payload,
    cb,
  };
}

export function getBillUnitSuccess(payload) {
  return {
    type: types.GET_BILL_UNIT_SUCCESS,
    payload,
  };
}

export function getBillUnitFailure(payload) {
  return {
    type: types.GET_BILL_UNIT_FAILURE,
    payload,
  };
}

export function setBillParams(payload) {
  return {
    type: types.SET_BILL_PARAMS,
    payload,
  };
}
