import { createSelector } from 'reselect';

const selectInvoicesReducer = state => state.get('invoiceReducer');

const makeErrorMessage = () =>
  createSelector(selectInvoicesReducer, invoices =>
    invoices.get('errorMessage'),
  );

export { makeErrorMessage };
