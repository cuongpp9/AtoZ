import { call, takeLatest } from 'redux-saga/effects';
import { queryRequest } from 'utils/request';
import {
  searchItems,
  searchPriceOffers,
  searchBundles,
  searchPackages,
  searchInvoiceUnits,
  getListCustomers,
  getBundleByBundleId,
  searchBillUnits,
  getAccountDetail,
} from 'api';
import * as types from './constants';

export function* selectItemsId({ payload, cb }) {
  try {
    const { page, size, filter } = payload;
    const response = yield call(
      queryRequest,
      searchItems({ page, size, filter }),
    );
    if (cb) cb({ success: true, data: response.searchItems });
  } catch (err) {
    if (cb) cb({ success: false });
  }
}

export function* selectPriceOfferId({ payload, cb }) {
  try {
    const { page, size, filter } = payload;
    const response = yield call(
      queryRequest,
      searchPriceOffers({ page, size, filter }),
    );
    if (cb) cb({ success: true, data: response.searchPriceOffers });
  } catch (err) {
    if (cb) cb({ success: false });
  }
}

export function* selectBundleId({ payload, cb }) {
  try {
    const { page, size, filter } = payload;
    const response = yield call(
      queryRequest,
      searchBundles({ page, size, filter }),
    );
    if (cb) cb({ success: true, data: response.searchBundles });
  } catch (err) {
    if (cb) cb({ success: false });
  }
}

export function* selectPackageId({ payload, cb }) {
  try {
    const { page, size, filter } = payload;
    const response = yield call(
      queryRequest,
      searchPackages({ page, size, filter }),
    );
    if (cb) cb({ success: true, data: response.searchPackages });
  } catch (err) {
    if (cb) cb({ success: false });
  }
}

export function* selectAccountId({ payload, cb }) {
  try {
    const { page, size, filter } = payload;
    const response = yield call(
      queryRequest,
      getListCustomers({ page, size, filter }),
    );
    if (cb) cb({ success: true, data: response.searchAccounts });
  } catch (err) {
    if (cb) cb({ success: false });
  }
}

export function* selectInvoiceUnitsId({ payload, cb }) {
  try {
    const { page, size, filter } = payload;
    const response = yield call(
      queryRequest,
      searchInvoiceUnits({ page, size, filter }),
    );
    if (cb) cb({ success: true, data: response.searchInvoiceUnits });
  } catch (err) {
    if (cb) cb({ success: false });
  }
}

export function* getBundleById({ payload, cb }) {
  try {
    const response = yield call(queryRequest, getBundleByBundleId(payload));
    if (cb) cb({ success: true, data: response.getBundleById });
  } catch (err) {
    if (cb) cb({ success: false });
  }
}

export function* selectBillUnitsId({ payload, cb }) {
  try {
    const { page, size, filter } = payload;
    const response = yield call(
      queryRequest,
      searchBillUnits({ page, size, filter }),
    );
    if (cb) cb({ success: true, data: response.searchBillUnits });
  } catch (err) {
    if (cb) cb({ success: false });
  }
}

export function* getAccountDetailSaga({ payload, cb }) {
  try {
    const response = yield call(queryRequest, getAccountDetail(payload));
    if (cb) cb({ success: true, data: response.getAccountById });
  } catch (err) {
    if (cb) cb({ success: false });
  }
}

export default function* selectSaga() {
  yield takeLatest(types.SELECT_ITEMS_ID, selectItemsId);
  yield takeLatest(types.SELECT_BUNDLE_ID, selectBundleId);
  yield takeLatest(types.SELECT_PACKAGE_ID, selectPackageId);
  yield takeLatest(types.SELECT_PRICE_OFFER_ID, selectPriceOfferId);
  yield takeLatest(types.SELECT_ACCOUNT_ID, selectAccountId);

  yield takeLatest(types.GET_BUNDLE_BY_BUNDLE_ID, getBundleById);
  yield takeLatest(types.SELECT_INVOICE_UNITS_ID, selectInvoiceUnitsId);
  yield takeLatest(types.SELECT_BILL_UNITS_ID, selectBillUnitsId);
  yield takeLatest(types.GET_ACCOUNT_DETAIL, getAccountDetailSaga);
}
