import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
// import { push } from 'react-router-redux';
import { queryRequest, mutationRequest } from 'utils/request';
import {
  getPaymentConfigByType,
  createPaymentConfig,
  modifyPaymentConfig,
  searchPayment,
  reversePayment,
  searchPaymentSuspense,
  searchInvoiceUnits,
  applyPayment,
  applyPaymentSuspense,
  getListCustomers,
  allocatePayment,
  modifyPaymentSuspense,
} from 'api';
import {
  resetNotification,
  setNotification,
} from 'containers/Notification/actions';
import { NotificationTypes } from 'constantsApp';
import { isConnecting, isEndConnected } from '../Loader/actions';
import * as types from './types';
import * as actions from './actions';

export function* searchAccountsSaga({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter, sort } = payload;
    const response = yield call(
      queryRequest,
      getListCustomers({ page, size, filter, sort }),
    );
    if (response.searchAccounts) {
      yield put(actions.searchAccountsSuccess(response.searchAccounts));
    } else {
      yield put(
        actions.searchAccountsFailure(
          'Failed to fetch accounts. Please try again or check your network!',
        ),
      );
    }
    yield put(isEndConnected());
    if (cb) cb();
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.searchAccountsFailure(
        'Failed to fetch accounts. Please try again or check your network!',
      ),
    );
    if (cb) cb();
  }
}

export function* getPaymentConfigTypeSaga({ payload, cb }) {
  yield put(isConnecting());

  try {
    const response = yield call(queryRequest, getPaymentConfigByType(payload));

    if (response) {
      yield cb({ success: true, response: response.getPaymentConfigByType });
    }
    yield put(isEndConnected());
  } catch (err) {
    yield put(isEndConnected());
    cb({ success: false });
  }
}

export function* createPaymentConfigMerchantSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const response = yield call(mutationRequest, createPaymentConfig(payload));
    if (response && response.createPaymentConfig) {
      yield cb({ success: true });
      yield put(
        setNotification({
          type: NotificationTypes.success,
          message: `Payment Config created successfully `,
        }),
      );
    } else {
      cb({ success: false });
      yield put(
        setNotification({
          type: NotificationTypes.error,
          message: `Payment Config created failed `,
        }),
      );
    }

    yield put(isEndConnected());
  } catch (err) {
    yield put(isEndConnected());
    cb({ success: false });
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Payment Config created failed `,
      }),
    );
  }
}

export function* modifyPaymentConfigMerchantSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const response = yield call(mutationRequest, modifyPaymentConfig(payload));
    yield put(isEndConnected());
    if (response && response.modifyPaymentConfig) {
      yield cb({ success: true });

      yield put(
        setNotification({
          type: NotificationTypes.success,
          message: `Payment Config updated successfully `,
        }),
      );
    } else {
      cb({ success: false });
      yield put(
        setNotification({
          type: NotificationTypes.error,
          message: `Payment Config updated failed `,
        }),
      );
    }
  } catch (err) {
    yield put(isEndConnected());
    cb({ success: false });
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Payment Config updated failed `,
      }),
    );
  }
}

export function* createPaymentConfigMethodSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const response = yield call(mutationRequest, createPaymentConfig(payload));
    if (response && response.createPaymentConfig) {
      yield cb({ success: true, response: response.createPaymentConfig });
      yield put(
        setNotification({
          type: NotificationTypes.success,
          message: `Payment Config created successfully `,
        }),
      );
    } else {
      cb({ success: false });
      yield put(
        setNotification({
          type: NotificationTypes.error,
          message: `Payment Config created failed`,
        }),
      );
    }

    yield put(isEndConnected());
  } catch (err) {
    yield put(isEndConnected());
    cb({ success: false });
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Payment Config created failed `,
      }),
    );
  }
}

export function* modifyPaymentConfigMethodSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const response = yield call(mutationRequest, modifyPaymentConfig(payload));
    yield put(isEndConnected());
    if (response && response.modifyPaymentConfig) {
      yield cb({ success: true, response: response.modifyPaymentConfig });

      yield put(
        setNotification({
          type: NotificationTypes.success,
          message: `Payment Config updated successfully `,
        }),
      );
    } else {
      cb({ success: false });
      yield put(
        setNotification({
          type: NotificationTypes.error,
          message: `Payment Config updated failed `,
        }),
      );
    }
  } catch (err) {
    yield put(isEndConnected());
    cb({ success: false });
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Payment Config updated failed`,
      }),
    );
  }
}

export function* createPaymentConfigTermSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const response = yield call(mutationRequest, createPaymentConfig(payload));
    if (response && response.createPaymentConfig) {
      yield cb({ success: true, response: response.createPaymentConfig });
      yield put(
        setNotification({
          type: NotificationTypes.success,
          message: `Payment Config created successfully `,
        }),
      );
    } else {
      cb({ success: false });
      yield put(
        setNotification({
          type: NotificationTypes.error,
          message: `Payment Config created failed `,
        }),
      );
    }
    yield put(isEndConnected());
  } catch (err) {
    yield put(isEndConnected());
    cb({ success: false });
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Payment Config created failed for type`,
      }),
    );
  }
}

export function* modifyPaymentConfigTermSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const response = yield call(mutationRequest, modifyPaymentConfig(payload));
    if (response && response.modifyPaymentConfig) {
      yield cb({ success: true, response: response.modifyPaymentConfig });
      yield put(
        setNotification({
          type: NotificationTypes.success,
          message: `Payment Config updated successfully `,
        }),
      );
    } else {
      cb({ success: false });
      yield put(
        setNotification({
          type: NotificationTypes.error,
          message: `Payment Config updated failed `,
        }),
      );
    }
    yield put(isEndConnected());
  } catch (err) {
    yield put(isEndConnected());
    cb({ success: false });
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Payment Config updated failed `,
      }),
    );
  }
}

// ------ search payment
export function* searchPaymentSaga({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter, sort } = payload;
    const response = yield call(
      queryRequest,
      searchPayment({ page, size, filter, sort }),
    );
    if (response.searchPayment) {
      yield put(actions.searchPaymentsSuccess(response.searchPayment));
    } else {
      yield put(
        actions.searchPaymentsFailure(
          'Failed to fetch payments. Please try again or check your network!',
        ),
      );
    }
    yield put(isEndConnected());
    if (cb) cb();
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.searchPaymentsFailure(
        'Failed to fetch payments. Please try again or check your network!',
      ),
    );
    if (cb) cb();
  }
}

// reverse payment
export function* reversePaymentSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const response = yield call(mutationRequest, reversePayment(payload));
    console.log('reversePaymentSaga', response);
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'Payment reversed successfully',
      }),
    );
    cb({ success: true, data: response.reversePayment });
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: 'Payment reversed failed',
      }),
    );
  }
  cb({ success: false });
}

// search Payment Suspense
export function* searchPaymentSuspenseSaga({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter, sort } = payload;
    const response = yield call(
      queryRequest,
      searchPaymentSuspense({ page, size, filter, sort }),
    );
    if (response.searchPaymentSuspense) {
      yield put(
        actions.searchPaymentSuspenseSuccess(response.searchPaymentSuspense),
      );
    } else {
      yield put(
        actions.searchPaymentSuspenseFailure(
          'Failed to fetch payments susepense. Please try again or check your network!',
        ),
      );
    }
    yield put(isEndConnected());
    if (cb) cb();
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.searchPaymentSuspenseFailure(
        'Failed to fetch payments susepense. Please try again or check your network!',
      ),
    );
    if (cb) cb();
  }
}

//

export function* applyPaymentSuspenseSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());

  try {
    const response = yield call(mutationRequest, applyPaymentSuspense(payload));
    if (response && response.applyPaymentSuspense) {
      yield put(isEndConnected());
      yield put(
        setNotification({
          type: NotificationTypes.success,
          message: `Apply payment suspense successfully`,
        }),
      );
      yield cb({ success: true, data: response.applyPaymentSuspense });
    } else {
      yield put(
        setNotification({
          type: NotificationTypes.error,
          message: `Apply payment suspense failed`,
        }),
      );
      cb({ success: false });
    }
  } catch (err) {
    yield cb({ success: false });
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Apply payment failed`,
      }),
    );
  }
}
// ------ search invoices
export function* searchInvoicesSaga({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter, sort } = payload;
    const response = yield call(
      queryRequest,
      searchInvoiceUnits({ page, size, filter, sort }),
    );
    if (response.searchInvoiceUnits) {
      yield put(actions.searchInvoicesSuccess(response.searchInvoiceUnits));
    } else {
      yield put(
        actions.searchInvoicesFailure(
          'Failed to fetch invoices. Please try again or check your network!',
        ),
      );
    }
    yield put(isEndConnected());
    if (cb) cb();
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.searchInvoicesFailure(
        'Failed to fetch invoices. Please try again or check your network!',
      ),
    );
    if (cb) cb();
  }
}

export function* applyPaymentSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());

  try {
    const response = yield call(mutationRequest, applyPayment(payload));

    if (response && response.applyPayment) {
      yield cb(true);
      yield put(isEndConnected());
      yield put(
        setNotification({
          type: NotificationTypes.success,
          message: `Apply payment successfully`,
        }),
      );
    } else {
      cb(false);
      yield put(
        setNotification({
          type: NotificationTypes.error,
          message: `Apply payment failed`,
        }),
      );
    }
  } catch (err) {
    yield put(isEndConnected());
    cb(false);
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Apply payment failed`,
      }),
    );
  }
}

export function* allocatePaymentSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const response = yield call(mutationRequest, allocatePayment(payload));
    console.log('allocatePayment', response);
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'Payment allocated successfully',
      }),
    );
    cb({ success: true, data: response.allocatePayment });
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Payment allocated failed${  err}`,
      }),
    );
  }
  cb({ success: false });
}

export function* modifiedPaymentSuspenseSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());

  try {
    const response = yield call(
      mutationRequest,
      modifyPaymentSuspense(payload),
    );
    if (response && response.modifyPaymentSuspense) {
      yield put(isEndConnected());
      yield put(
        setNotification({
          type: NotificationTypes.success,
          message: `Payment Suspense modified successfully`,
        }),
      );
      yield cb({ success: true, data: response.modifyPaymentSuspense });
    } else {
      yield put(
        setNotification({
          type: NotificationTypes.error,
          message: `Payment Suspense modified failed`,
        }),
      );
      cb({ success: false });
    }
  } catch (err) {
    yield cb({ success: false });
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Payment Suspense modified failed`,
      }),
    );
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* paymentSaga() {
  yield takeLatest(types.SEARCH_ACCOUNTS, searchAccountsSaga);
  yield takeEvery(types.GET_PAYMENT_CONFIG_BY_TYPE, getPaymentConfigTypeSaga);
  yield takeLatest(
    types.CREATE_PAYMENT_CONFIG_MERCHANT,
    createPaymentConfigMerchantSaga,
  );
  yield takeLatest(
    types.MODIFY_PAYMENT_CONFIG_MERCHANT,
    modifyPaymentConfigMerchantSaga,
  );
  yield takeLatest(
    types.CREATE_PAYMENT_CONFIG_METHOD,
    createPaymentConfigMethodSaga,
  );
  yield takeLatest(
    types.MODIFY_PAYMENT_CONFIG_METHOD,
    modifyPaymentConfigMethodSaga,
  );
  yield takeLatest(
    types.CREATE_PAYMENT_CONFIG_TERM,
    createPaymentConfigTermSaga,
  );
  yield takeLatest(
    types.MODIFY_PAYMENT_CONFIG_TERM,
    modifyPaymentConfigTermSaga,
  );
  yield takeLatest(types.SEARCH_PAYMENTS, searchPaymentSaga);
  yield takeLatest(types.REVERSE_PAYMENT, reversePaymentSaga);
  yield takeLatest(types.SEARCH_PAYMENTS_SUSPENSE, searchPaymentSuspenseSaga);
  yield takeLatest(types.APPLY_PAYMENT_SUSPENSE, applyPaymentSuspenseSaga);
  yield takeLatest(types.SEARCH_INVOICES, searchInvoicesSaga);
  yield takeLatest(types.APPLY_PAYMENT, applyPaymentSaga);
  yield takeLatest(types.ALLOCATE_PAYMENT, allocatePaymentSaga);
  yield takeLatest(types.MODIFY_PAYMENT_SUSPENSE, modifiedPaymentSuspenseSaga);
}
