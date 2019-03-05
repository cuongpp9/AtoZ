import * as types from './types';

export function getPaymentConfigByType(payload, cb) {
  return {
    type: types.GET_PAYMENT_CONFIG_BY_TYPE,
    payload,
    cb,
  };
}

export function searchPayments(payload, cb) {
  return {
    type: types.SEARCH_PAYMENTS,
    payload,
    cb,
  };
}

export function searchPaymentsSuccess(payload) {
  return {
    type: types.SEARCH_PAYMENTS_SUCCESS,
    payload,
  };
}

export function searchPaymentsFailure(payload) {
  return {
    type: types.SEARCH_PAYMENTS_FAILURE,
    payload,
  };
}

export function setParamsPayments(payload) {
  return {
    type: types.SET_PARAMS_PAYMENTS,
    payload,
  };
}

export function reversePayment(payload, cb) {
  return {
    type: types.REVERSE_PAYMENT,
    payload,
    cb,
  };
}

export function searchPaymentSuspense(payload, cb) {
  return {
    type: types.SEARCH_PAYMENTS_SUSPENSE,
    payload,
    cb,
  };
}

export function searchPaymentSuspenseSuccess(payload) {
  return {
    type: types.SEARCH_PAYMENTS_SUSPENSE_SUCCESS,
    payload,
  };
}

export function searchPaymentSuspenseFailure(payload) {
  return {
    type: types.SEARCH_PAYMENTS_SUSPENSE_FAILURE,
    payload,
  };
}

export function setParamsPaymentsSuspense(payload) {
  return {
    type: types.SET_PARAMS_PAYMENTS_SUSPENSE,
    payload,
  };
}

export function applyPaymentSuspense(payload, cb) {
  return {
    type: types.APPLY_PAYMENT_SUSPENSE,
    payload,
    cb,
  };
}

// search invoices
export function searchInvoices(payload, cb) {
  return {
    type: types.SEARCH_INVOICES,
    payload,
    cb,
  };
}

export function searchInvoicesSuccess(payload) {
  return {
    type: types.SEARCH_INVOICES_SUCCESS,
    payload,
  };
}

export function searchInvoicesFailure(payload) {
  return {
    type: types.SEARCH_INVOICES_FAILED,
    payload,
  };
}

export function createPaymentConfigMerchant(payload, cb) {
  return {
    type: types.CREATE_PAYMENT_CONFIG_MERCHANT,
    payload,
    cb,
  };
}

export function modifyPaymentConfigMerchant(payload, cb) {
  return {
    type: types.MODIFY_PAYMENT_CONFIG_MERCHANT,
    payload,
    cb,
  };
}

export function createPaymentConfigMethod(payload, cb) {
  return {
    type: types.CREATE_PAYMENT_CONFIG_METHOD,
    payload,
    cb,
  };
}

export function modifyPaymentConfigMethod(payload, cb) {
  return {
    type: types.MODIFY_PAYMENT_CONFIG_METHOD,
    payload,
    cb,
  };
}

export function createPaymentConfigTerm(payload, cb) {
  return {
    type: types.CREATE_PAYMENT_CONFIG_TERM,
    payload,
    cb,
  };
}

export function modifyPaymentConfigTerm(payload, cb) {
  return {
    type: types.MODIFY_PAYMENT_CONFIG_TERM,
    payload,
    cb,
  };
}

export function applyPayment(payload, cb) {
  return {
    type: types.APPLY_PAYMENT,
    payload,
    cb,
  };
}

export function searchAccounts(payload, cb) {
  return {
    type: types.SEARCH_ACCOUNTS,
    payload,
    cb,
  };
}

export function searchAccountsSuccess(payload) {
  return {
    type: types.SEARCH_ACCOUNTS_SUCCESS,
    payload,
  };
}

export function searchAccountsFailure(payload) {
  return {
    type: types.SEARCH_ACCOUNTS_FAILURE,
    payload,
  };
}

export function setParamsAccounts(payload) {
  return {
    type: types.SET_PARAMS_ACCOUNTS,
    payload,
  };
}

export function allocatePayment(payload, cb) {
  return {
    type: types.ALLOCATE_PAYMENT,
    payload,
    cb,
  };
}

export function modifyPaymentSuspense(payload, cb) {
  return {
    type: types.MODIFY_PAYMENT_SUSPENSE,
    payload,
    cb,
  };
}
