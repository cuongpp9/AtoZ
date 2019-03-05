import { call, put, takeLatest } from 'redux-saga/effects';
import { queryRequest } from 'utils/request';
import { getInvoiceUnitById } from 'api';
import { handleError } from 'utils/utils';
import { isConnecting, isEndConnected } from '../Loader/actions';
import * as types from './types';
import * as actions from './actions';

// ------ Items
export function* getInvoiceByIdSaga({ payload, cb }) {
  yield put(isConnecting());
  try {
    const response = yield call(queryRequest, getInvoiceUnitById(payload));
    if (response.getInvoiceUnitById) {
      cb(response.getInvoiceUnitById);
    } else {
      yield put(
        actions.getInvoiceByIdFailed(`Can not get invoice data for ${payload}`),
      );
    }
    yield put(isEndConnected());
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.getInvoiceByIdFailed(
        handleError(err),
        `Can not get invoice data for ${payload}`,
      ),
    );
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* invoiceSaga() {
  yield takeLatest(types.GET_INVOICE_BY_ID, getInvoiceByIdSaga);
}
