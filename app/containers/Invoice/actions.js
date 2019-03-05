import * as types from './types';

export function getInvoiceById(payload, cb) {
  return {
    type: types.GET_INVOICE_BY_ID,
    payload,
    cb,
  };
}

export function getInvoiceByIdFailed(payload) {
  return {
    type: types.GET_INVOICE_BY_ID_FAILED,
    payload,
  };
}
