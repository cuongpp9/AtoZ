/**
 * Collections selectors
 */

import { createSelector } from 'reselect';

const selectCollections = state => state.get('paymentsReducer');

// ----search account

const makePageAccountParams = () =>
  createSelector(selectCollections, item => item.get('paramAccounts').toJS());

const makeGetListAccounts = () =>
  createSelector(selectCollections, items => [...items.get('listAccounts')]);

const makeErrorMessageAccounts = () =>
  createSelector(selectCollections, item => item.get('errorMessageAccounts'));

// ----collection units

const makeGetlistPayments = () =>
  createSelector(selectCollections, items => [...items.get('listPayments')]);

const makePagePaymentsParams = () =>
  createSelector(selectCollections, item => item.get('paramsPayments').toJS());

const errorMessagePayments = () =>
  createSelector(selectCollections, item => item.get('errorMessagePayments'));

const makeGetlistPaymentSuspense = () =>
  createSelector(selectCollections, items => [
    ...items.get('listPaymentSuspense'),
  ]);

const makePagePaymentSuspenseParams = () =>
  createSelector(selectCollections, item =>
    item.get('paramsPaymentSuspense').toJS(),
  );

const errorMessagePaymentSuspense = () =>
  createSelector(selectCollections, item =>
    item.get('errorMessagePaymentSuspense'),
  );

const makeGetInvoices = () =>
  createSelector(selectCollections, items => [...items.get('invoices')]);

const errorMsgInvoices = () =>
  createSelector(selectCollections, item => item.get('errorMsgInvoices'));

export {
  makePageAccountParams,
  makeGetListAccounts,
  makeErrorMessageAccounts,
  makeGetlistPayments,
  makePagePaymentsParams,
  errorMessagePayments,
  makeGetlistPaymentSuspense,
  makePagePaymentSuspenseParams,
  errorMessagePaymentSuspense,
  makeGetInvoices,
  errorMsgInvoices,
};
