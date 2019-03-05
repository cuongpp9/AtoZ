/**
 * Orders management selectors
 */

import { createSelector } from 'reselect';

const selectOrders = state => state.get('orderReducer');

const makeGetListOrders = () =>
  createSelector(selectOrders, orders => [...orders.get('listOrders')]);

const makePageOrderParams = () =>
  createSelector(selectOrders, orders => orders.get('params').toJS());

const makeGetOrderDetail = () =>
  createSelector(selectOrders, order => order.get('orderDetail'));

const makeErrorMessage = () =>
  createSelector(selectOrders, order => order.get('errorMessage'));

const makeGetSubscription = () =>
  createSelector(selectOrders, subscription =>
    subscription.get('subscription'),
  );

const makeGetServiceUnits = () =>
  createSelector(selectOrders, serviceUnits => [
    ...serviceUnits.get('serviceUnits'),
  ]);

const makeGetErrorSubscription = () =>
  createSelector(selectOrders, subscription =>
    subscription.get('errorSubscription'),
  );

const makeGetErrorServiceUnits = () =>
  createSelector(selectOrders, serviceUnits =>
    serviceUnits.get('errorServiceUnits'),
  );

const makeGetPriceUnits = () =>
  createSelector(selectOrders, priceUnits => [...priceUnits.get('priceUnits')]);

const makeGetErrorPriceUnits = () =>
  createSelector(selectOrders, priceUnits => priceUnits.get('errorPriceUnits'));

export {
  makeGetListOrders,
  makePageOrderParams,
  makeGetOrderDetail,
  makeErrorMessage,
  makeGetSubscription,
  makeGetServiceUnits,
  makeGetPriceUnits,
  makeGetErrorSubscription,
  makeGetErrorServiceUnits,
  makeGetErrorPriceUnits,
};
