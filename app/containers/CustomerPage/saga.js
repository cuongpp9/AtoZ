import { call, put, takeLatest } from 'redux-saga/effects';
import { queryRequest, mutationRequest } from 'utils/request';
import { push } from 'react-router-redux';
import {
  getListCustomers,
  createAccount,
  getAccountDetail,
  modifyAccount,
  updateAccountStatus,
  getPriceUnitsByAccountId,
  getServiceUnitsByAccountId,
  getSubscriptionByAccountId,
  getBalanceUnitByAccountId,
  getTransactionUnit,
  getBillUnit,
} from 'api';
import {
  resetNotification,
  setNotification,
} from 'containers/Notification/actions';
import { NotificationTypes } from 'constantsApp';
import { isConnecting, isEndConnected } from '../Loader/actions';
import * as types from './types';
import * as actions from './actions';

export function* getCustomersSaga({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter, sort } = payload;
    const response = yield call(
      queryRequest,
      getListCustomers({ page, size, filter, sort }),
    );
    yield put(actions.getCustomersSuccess(response.searchAccounts));
    yield put(isEndConnected());
    if (cb) cb();
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.getCustomersFailure(
        'Failed to fetch data. Please try again or check your network!',
      ),
    );
    if (cb) cb();
  }
}

export function* getCustomersIdSaga({ payload, cb }) {
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

export function* createAccountSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataCreate = payload;
    const response = yield call(mutationRequest, createAccount(dataCreate));
    yield put(actions.createAccountSuccess());
    yield cb();
    yield put(isEndConnected());
    yield put(push(`/customers/${response.createAccount.id}/info`));
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'Account created successfully!',
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Account created failed! <br> ${err}`,
      }),
    );
    cb();
  }
}

export function* modifyAccountSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const response = yield call(mutationRequest, modifyAccount(payload));
    yield put(actions.modifyAccountSuccess(response.modifyAccount));
    yield cb({ success: true });
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'Account updated successfully!',
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Account updated failed! <br> ${err}`,
      }),
    );
    cb({ success: false });
  }
}

export function* updateAccountStatusSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const response = yield call(mutationRequest, updateAccountStatus(payload));
    yield put(actions.updateAccountStatusSuccess(response.updateStatus));
    yield cb({ success: true });
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: "Account's status updated successfully!",
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Account's status updated failed! <br> ${err}`,
      }),
    );
    cb({ success: false });
  }
}

export function* getAccountSaga({ payload }) {
  yield put(isConnecting());
  try {
    const response = yield call(queryRequest, getAccountDetail(payload));
    if (response.getAccountById) {
      yield put(actions.getAccountDetailSuccess(response.getAccountById));
      yield put(actions.getPriceUnits(payload));
      yield put(actions.getSubscription(payload));
      yield put(actions.getServiceUnitAc(payload));
      yield put(actions.getBalanceUnit(payload));
    } else {
      yield put(
        actions.getAccountDetailFailure(
          `Can not get detail for account ${payload}`,
        ),
      );
    }
    yield put(isEndConnected());
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.getAccountDetailFailure(
        `Can not get detail for account ${payload}`,
      ),
    );
  }
}

export function* getPriceUnitsSaga({ payload }) {
  try {
    const response = yield call(
      queryRequest,
      getPriceUnitsByAccountId(payload),
    );
    if (response.getPriceUnitsByAccountId) {
      yield put(
        actions.getPriceUnitsSuccess(response.getPriceUnitsByAccountId),
      );
    } else {
      yield put(
        actions.getPriceUnitsFailure(
          `Can not get price units for account ${payload}`,
        ),
      );
    }
  } catch (err) {
    yield put(
      actions.getPriceUnitsFailure(
        `Can not get price units for account ${payload}`,
      ),
    );
  }
}

export function* getSubscriptionSaga({ payload }) {
  try {
    const response = yield call(
      queryRequest,
      getSubscriptionByAccountId(payload),
    );
    if (response.getSubscriptionByAccountId) {
      yield put(
        actions.getSubscriptionSuccess(response.getSubscriptionByAccountId),
      );
    } else {
      yield put(
        actions.getSubscriptionFailure(
          `Can not get subscription for account ${payload}`,
        ),
      );
    }
  } catch (err) {
    yield put(
      actions.getSubscriptionFailure(
        `Can not get subscription for account ${payload}`,
      ),
    );
  }
}

export function* getServiceUnitsAcSaga({ payload }) {
  try {
    const response = yield call(
      queryRequest,
      getServiceUnitsByAccountId(payload),
    );
    if (response.getServiceUnitsByAccountId) {
      yield put(
        actions.getServiceUnitAcSuccess(response.getServiceUnitsByAccountId),
      );
    } else {
      yield put(
        actions.getServiceUnitAcFailure(
          `Can not get service units for account ${payload}`,
        ),
      );
    }
  } catch (err) {
    yield put(
      actions.getServiceUnitAcFailure(
        `Can not get service units for account ${payload}`,
      ),
    );
  }
}

export function* getBalanceUnitSaga({ payload }) {
  try {
    const response = yield call(
      queryRequest,
      getBalanceUnitByAccountId(payload),
    );
    if (response.getBalanceUnitByAccountId) {
      yield put(
        actions.getBalanceUnitSuccess(response.getBalanceUnitByAccountId),
      );
    } else {
      yield put(
        actions.getBalanceUnitFailure(
          `Can not get balance units for account ${payload}`,
        ),
      );
    }
  } catch (err) {
    yield put(
      actions.getBalanceUnitFailure(
        `Can not get balance units for account ${payload}`,
      ),
    );
  }
}

export function* getTransactionSaga({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter, sort } = payload;
    const response = yield call(
      queryRequest,
      getTransactionUnit({ page, size, filter, sort }),
    );
    yield put(
      actions.getTransactionUnitSuccess(response.searchTransactionUnits),
    );
    yield put(isEndConnected());
    if (cb) cb();
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.getTransactionUnitFailure(
        'Failed to fetch data. Please try again or check your network!',
      ),
    );
    if (cb) cb();
  }
}

export function* getBillSaga({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter, sort } = payload;
    const response = yield call(
      queryRequest,
      getBillUnit({ page, size, filter, sort }),
    );
    yield put(actions.getBillUnitSuccess(response.searchBillUnits));
    yield put(isEndConnected());
    if (cb) cb();
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.getBillUnitSuccess(
        'Failed to fetch data. Please try again or check your network!',
      ),
    );
    if (cb) cb();
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* customersSaga() {
  yield takeLatest(types.GET_CUSTOMERS, getCustomersSaga);
  yield takeLatest(types.CREATE_ACCOUNT, createAccountSaga);
  yield takeLatest(types.GET_ACCOUNT_DETAIL, getAccountSaga);
  yield takeLatest(types.MODIFY_ACCOUNT, modifyAccountSaga);
  yield takeLatest(types.UPDATE_ACCOUNT_STATUS, updateAccountStatusSaga);
  yield takeLatest(types.GET_PRICE_UNITS, getPriceUnitsSaga);
  yield takeLatest(types.GET_SERVICE_UNITS_AC, getServiceUnitsAcSaga);
  yield takeLatest(types.GET_SUBSCRIPTION, getSubscriptionSaga);
  yield takeLatest(types.GET_BALANCE_UNIT, getBalanceUnitSaga);
  yield takeLatest(types.GET_CUSTOMERS_ID, getCustomersIdSaga);
  yield takeLatest(types.GET_TRANSACTION_UNIT, getTransactionSaga);
  yield takeLatest(types.GET_BILL_UNIT, getBillSaga);
}
