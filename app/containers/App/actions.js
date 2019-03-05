import * as types from './constants';

export function selectItemsId(payload, cb) {
  return {
    type: types.SELECT_ITEMS_ID,
    payload,
    cb,
  };
}

export function selectPriceOfferId(payload, cb) {
  return {
    type: types.SELECT_PRICE_OFFER_ID,
    payload,
    cb,
  };
}

export function selectBundleId(payload, cb) {
  return {
    type: types.SELECT_BUNDLE_ID,
    payload,
    cb,
  };
}

export function selectPackageId(payload, cb) {
  return {
    type: types.SELECT_PACKAGE_ID,
    payload,
    cb,
  };
}

export function selectAccountId(payload, cb) {
  return {
    type: types.SELECT_ACCOUNT_ID,
    payload,
    cb,
  };
}

export function selectInvoiceId(payload, cb) {
  return {
    type: types.SELECT_INVOICE_UNITS_ID,
    payload,
    cb,
  };
}

export function getBundleByBundleId(payload, cb) {
  return {
    type: types.GET_BUNDLE_BY_BUNDLE_ID,
    payload,
    cb,
  };
}

export function selectBillUnitId(payload, cb) {
  return {
    type: types.SELECT_BILL_UNITS_ID,
    payload,
    cb,
  };
}

export function getAccountDetail(payload, cb) {
  return {
    type: types.GET_ACCOUNT_DETAIL,
    payload,
    cb,
  };
}
