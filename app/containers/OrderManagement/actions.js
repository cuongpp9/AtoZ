import * as types from './types';

export function searchOrders(payload, cb) {
  return {
    type: types.SEARCH_ORDERS,
    payload,
    cb,
  };
}

export function searchOrdersSuccess(payload) {
  return {
    type: types.SEARCH_ORDERS_SUCCESS,
    payload,
  };
}

export function searchOrdersFailure(payload) {
  return {
    type: types.SEARCH_ORDERS_FAILURE,
    payload,
  };
}

export function setParams(payload) {
  return {
    type: types.SET_PARAMS,
    payload,
  };
}

export function getOrderDetail(payload, cb) {
  return {
    type: types.GET_ORDERS_DETAIL,
    payload,
    cb,
  };
}

export function getOrderDetailSuccess(payload) {
  return {
    type: types.GET_ORDERS_DETAIL_SUCCESS,
    payload,
  };
}

export function getOrderDetailFailure(payload) {
  return {
    type: types.GET_ORDERS_DETAIL_FAILURE,
    payload,
  };
}

export function createOrder(payload, cb) {
  return {
    type: types.CREATE_ORDERS,
    payload,
    cb,
  };
}

export function createOrderSuccess(payload) {
  return {
    type: types.CREATE_ORDERS_SUCCESS,
    payload,
  };
}

export function createOrderFailure(payload) {
  return {
    type: types.CREATE_ORDERS_FAILURE,
    payload,
  };
}

export function modifyOrder(payload, cb) {
  return {
    type: types.MODIFY_ORDER,
    payload,
    cb,
  };
}

export function modifyOrderSuccess(payload) {
  return {
    type: types.MODIFY_ORDER_SUCCESS,
    payload,
  };
}

export function updateOrderStatus(payload, cb) {
  return {
    type: types.UPDATE_ORDER_STATUS,
    payload,
    cb,
  };
}

export function updateOrderStatusSuccess(payload) {
  return {
    type: types.UPDATE_ORDER_STATUS_SUCCESS,
    payload,
  };
}

export function getSubscriptionByAccountId(payload) {
  return {
    type: types.GET_SUBSCRIPTION_BY_ACCOUNT_ID,
    payload,
  };
}

export function getSubscriptionByAccountIdSuccess(payload) {
  return {
    type: types.GET_SUBSCRIPTION_BY_ACCOUNT_ID_SUCCESS,
    payload,
  };
}

export function getSubscriptionByAccountIdFailure(payload) {
  return {
    type: types.GET_SUBSCRIPTION_BY_ACCOUNT_ID_FAILURE,
    payload,
  };
}

export function getServiceUnitsBySubscriptionId(payload) {
  return {
    type: types.GET_SERVICE_UNITS_BY_SUBSCRIPTION_ID,
    payload,
  };
}

export function getServiceUnitsBySubscriptionIdSuccess(payload) {
  return {
    type: types.GET_SERVICE_UNITS_BY_SUBSCRIPTION_ID_SUCCESS,
    payload,
  };
}

export function getServiceUnitsBySubscriptionIdFailure(payload) {
  return {
    type: types.GET_SERVICE_UNITS_BY_SUBSCRIPTION_ID_FAILURE,
    payload,
  };
}

export function getPriceUnitsByServiceUnitId(payload) {
  return {
    type: types.GET_PRICE_UNITS_BY_SERVICE_UNIT_ID,
    payload,
  };
}

export function getPriceUnitsByServiceUnitIdSuccess(payload) {
  return {
    type: types.GET_PRICE_UNITS_BY_SERVICE_UNIT_ID_SUCCESS,
    payload,
  };
}

export function getPriceUnitsByServiceUnitIdFailure(payload) {
  return {
    type: types.GET_PRICE_UNITS_BY_SERVICE_UNIT_ID_FAILURE,
    payload,
  };
}
