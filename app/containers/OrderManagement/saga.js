import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { queryRequest, mutationRequest } from 'utils/request';
import {
  searchOrders,
  getOrderDetail,
  createOrder,
  modifyOrder,
  updateOrderStatus,
  getSubscriptionByAccountId,
  getServiceUnitsBySubscriptionId,
  getPriceUnitsByServiceUnitId,
} from 'api';
import {
  resetNotification,
  setNotification,
} from 'containers/Notification/actions';
import { NotificationTypes, Messages } from 'constantsApp';
import { formatStringUrl, handleError } from 'utils/utils';

import { isConnecting, isEndConnected } from '../Loader/actions';
import * as types from './types';
import * as actions from './actions';

export function* searchOrdersSaga({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter, sort } = payload;
    const response = yield call(
      queryRequest,
      searchOrders({ page, size, filter, sort }),
    );
    if (response.searchOrders) {
      yield put(actions.searchOrdersSuccess(response.searchOrders));
    } else {
      yield put(actions.searchOrdersFailure('Failed to Fetch data!'));
    }
    yield put(isEndConnected());
    if (cb) cb();
  } catch (err) {
    yield put(isEndConnected());
    yield put(actions.searchOrdersFailure('Failed to Fetch data!'));
    if (cb) cb();
  }
}

export function* getOrderSaga({ payload }) {
  yield put(isConnecting());
  try {
    const response = yield call(queryRequest, getOrderDetail(payload));
    if (response.getOrderById) {
      yield put(actions.getOrderDetailSuccess(response.getOrderById));
    } else {
      yield put(
        actions.getOrderDetailFailure(
          formatStringUrl(Messages.noOrder, payload),
        ),
      );
    }
    yield put(isEndConnected());
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      actions.getOrderDetailFailure(formatStringUrl(Messages.noOrder, payload)),
    );
  }
}

export function* createOrderSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataCreate = payload;
    const response = yield call(mutationRequest, createOrder(dataCreate));
    yield put(actions.createOrderSuccess());
    yield cb();
    yield put(isEndConnected());
    if (response.createOrder && response.createOrder.id) {
      yield put(push(`/orders/${response.createOrder.id}/detail`));
      yield put(
        setNotification({
          type: NotificationTypes.success,
          message: 'Order created successfully!',
        }),
      );
    } else {
      yield put(
        setNotification({
          type: NotificationTypes.error,
          message: 'Order created failed!',
        }),
      );
    }
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: handleError(err, 'Order created failed!'),
      }),
    );
    cb();
  }
}

export function* modifyOrderSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataCreate = payload;
    const response = yield call(mutationRequest, modifyOrder(dataCreate));
    yield put(actions.modifyOrderSuccess(response.modifyOrder));
    yield cb({ success: true });
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'Order updated successfully!',
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: handleError(err, 'Order updated failed!'),
      }),
    );
    cb({ success: false });
  }
}

export function* updateOrderStatusSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const response = yield call(mutationRequest, updateOrderStatus(payload));
    yield put(actions.updateOrderStatusSuccess(response.updateOrderStatus));
    yield cb({ success: true });
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: "Order's status updated successfully!",
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: handleError(err, "Order's status updated failed!"),
      }),
    );
    cb({ success: false });
  }
}

export function* getSubscriptionByAccountIdSaga({ payload }) {
  try {
    const response = yield call(
      queryRequest,
      getSubscriptionByAccountId(payload),
    );
    if (response.getSubscriptionByAccountId) {
      yield put(
        actions.getSubscriptionByAccountIdSuccess(
          response.getSubscriptionByAccountId,
        ),
      );
      yield put(
        actions.getServiceUnitsBySubscriptionId(
          response.getSubscriptionByAccountId.id,
        ),
      );
    } else {
      yield put(
        actions.getSubscriptionByAccountIdFailure(
          `Can not get subscription with account id ${payload}`,
        ),
      );
    }
  } catch (err) {
    yield put(
      actions.getSubscriptionByAccountIdFailure(
        `Can not get subscription with account id ${payload}`,
      ),
    );
  }
}

export function* getServiceUnitsBySubscriptionIdSaga({ payload }) {
  try {
    const response = yield call(
      queryRequest,
      getServiceUnitsBySubscriptionId(payload),
    );
    if (response.getServiceUnitsBySubscriptionId) {
      yield put(
        actions.getServiceUnitsBySubscriptionIdSuccess(
          response.getServiceUnitsBySubscriptionId,
        ),
      );
    } else {
      yield put(
        actions.getServiceUnitsBySubscriptionIdFailure(
          `Can not get service units with subscription id ${payload}`,
        ),
      );
    }
  } catch (err) {
    yield put(
      actions.getServiceUnitsBySubscriptionIdFailure(
        `Can not get service units with subscription id ${payload}`,
      ),
    );
  }
}

export function* getPriceUnitsByServiceUnitIdSaga({ payload }) {
  try {
    const response = yield call(
      queryRequest,
      getPriceUnitsByServiceUnitId(payload),
    );
    if (response.getPriceUnitsByServiceUnitId) {
      console.log('data: ', response);
      yield put(
        actions.getPriceUnitsByServiceUnitIdSuccess(
          response.getPriceUnitsByServiceUnitId,
        ),
      );
    } else {
      yield put(
        actions.getPriceUnitsByServiceUnitIdFailure(
          `Can not get price units with service unit id ${payload}`,
        ),
      );
    }
  } catch (err) {
    yield put(
      actions.getPriceUnitsByServiceUnitIdFailure(
        `Can not get price units with service unit id ${payload}`,
      ),
    );
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* ordersSaga() {
  yield takeLatest(types.SEARCH_ORDERS, searchOrdersSaga);
  yield takeLatest(types.GET_ORDERS_DETAIL, getOrderSaga);
  yield takeLatest(types.CREATE_ORDERS, createOrderSaga);
  yield takeLatest(types.MODIFY_ORDER, modifyOrderSaga);
  yield takeLatest(types.UPDATE_ORDER_STATUS, updateOrderStatusSaga);

  yield takeLatest(
    types.GET_SUBSCRIPTION_BY_ACCOUNT_ID,
    getSubscriptionByAccountIdSaga,
  );
  yield takeLatest(
    types.GET_SERVICE_UNITS_BY_SUBSCRIPTION_ID,
    getServiceUnitsBySubscriptionIdSaga,
  );

  yield takeLatest(
    types.GET_PRICE_UNITS_BY_SERVICE_UNIT_ID,
    getPriceUnitsByServiceUnitIdSaga,
  );
}
