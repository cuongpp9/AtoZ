/**
 * Customerpage selectors
 */

import { createSelector } from 'reselect';

const selectCustomers = state => state.get('customerReducer');

const makeGetListCustomers = () =>
  createSelector(selectCustomers, customers => [
    ...customers.get('listCustomers'),
  ]);
const makePageCusomterParams = () =>
  createSelector(selectCustomers, customers => customers.get('params').toJS());

const makeAccountDetail = () =>
  createSelector(selectCustomers, customers =>
    customers.get('accountSelected'),
  );
const makeGetPriceUnits = () =>
  createSelector(selectCustomers, customers => [
    ...customers.get('priceUnits'),
  ]);

const makeGetServiceUnitsAc = () =>
  createSelector(selectCustomers, customers => [
    ...customers.get('serviceUnitsAc'),
  ]);

const makeGetSubscription = () =>
  createSelector(selectCustomers, customers => customers.get('subscription'));

const makeGetBalanceUnit = () =>
  createSelector(selectCustomers, customers => customers.get('balanceUnit'));

const makeGetTransactionUnit = () =>
  createSelector(selectCustomers, customers => [
    ...customers.get('transactionUnits'),
  ]);

const makePageTransactionParams = () =>
  createSelector(selectCustomers, customers =>
    customers.get('paramsTransaction').toJS(),
  );

const makeGetBillUnit = () =>
  createSelector(selectCustomers, customers => [...customers.get('billUnits')]);

const makePageBillParams = () =>
  createSelector(selectCustomers, customers =>
    customers.get('paramsBill').toJS(),
  );

const makeErrorMessage = () =>
  createSelector(selectCustomers, customers => customers.get('errorMessage'));

const makeErrorMessagePU = () =>
  createSelector(selectCustomers, customers =>
    customers.get('errorPriceUnits'),
  );

const makeErrorMessageSU = () =>
  createSelector(selectCustomers, customers =>
    customers.get('errorServiceUnits'),
  );

const makeErrorMessageSubscription = () =>
  createSelector(selectCustomers, customers =>
    customers.get('errorSubscription'),
  );
const makeErrorMessageBU = () =>
  createSelector(selectCustomers, customers =>
    customers.get('errorBalanceUnits'),
  );
const makeErrorMessageTU = () =>
  createSelector(selectCustomers, customers =>
    customers.get('errorTransactionUnit'),
  );

const makeErrorMessageBillU = () =>
  createSelector(selectCustomers, customers => customers.get('errorBillUnit'));

export {
  makeGetListCustomers,
  makePageCusomterParams,
  makeAccountDetail,
  makeGetPriceUnits,
  makeGetServiceUnitsAc,
  makeGetSubscription,
  makeGetBalanceUnit,
  makeGetTransactionUnit,
  makePageTransactionParams,
  makeGetBillUnit,
  makePageBillParams,
  makeErrorMessage,
  makeErrorMessagePU,
  makeErrorMessageSU,
  makeErrorMessageSubscription,
  makeErrorMessageBU,
  makeErrorMessageTU,
  makeErrorMessageBillU,
};
