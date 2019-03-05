/**
 * Collections selectors
 */

import { createSelector } from 'reselect';

const selectCollections = state => state.get('collectionsReducer');

// ----collection units

const makeGetListCollectionUnits = () =>
  createSelector(selectCollections, items => [
    ...items.get('listCollectionUnits'),
  ]);

const errorMessageCollectionUnits = () =>
  createSelector(selectCollections, item =>
    item.get('errorMessageCollectionUnits'),
  );

const makeGetListInvoiceUnits = () =>
  createSelector(selectCollections, items => [
    ...items.get('listInvoiceUnits'),
  ]);

const makeInvoiceUnitsParams = () =>
  createSelector(selectCollections, item =>
    item.get('paramInvoiceUnits').toJS(),
  );

const errorMessageInvoiceUnits = () =>
  createSelector(selectCollections, item =>
    item.get('errorMessageInvoiceUnits'),
  );

const makePageAccountParams = () =>
  createSelector(selectCollections, item => item.get('paramAccounts').toJS());

const makeGetListAccounts = () =>
  createSelector(selectCollections, items => [...items.get('listAccounts')]);

const makeErrorMessageAccounts = () =>
  createSelector(selectCollections, item => item.get('errorMessageAccounts'));

const makePageHistoryParam = () =>
  createSelector(selectCollections, item => item.get('paramHistory').toJS());

const makeGetListHistory = () =>
  createSelector(selectCollections, items => [...items.get('listHistorys')]);

const makeErrorMessageHistory = () =>
  createSelector(selectCollections, item => item.get('errorMessageHistory'));

const makeAgentActivityParams = () =>
  createSelector(selectCollections, item =>
    item.get('paramAgentActivity').toJS(),
  );

const makeGetAgentActivities = () =>
  createSelector(selectCollections, items => [...items.get('agentActivities')]);

const makeErrorAgentActivity = () =>
  createSelector(selectCollections, item =>
    item.get('errorAgentActivityMessage'),
  );

const makeCollectionHistoryDetail = () =>
  createSelector(selectCollections, item =>
    item.get('collectionHistoryDetail'),
  );

export {
  makeGetListCollectionUnits,
  errorMessageCollectionUnits,
  makeGetListInvoiceUnits,
  makeInvoiceUnitsParams,
  errorMessageInvoiceUnits,
  makeGetListAccounts,
  makePageAccountParams,
  makeErrorMessageAccounts,
  makePageHistoryParam,
  makeGetListHistory,
  makeErrorMessageHistory,
  makeAgentActivityParams,
  makeGetAgentActivities,
  makeErrorAgentActivity,
  makeCollectionHistoryDetail,
};
