/**
 * ArOperations selectors
 */

import { createSelector } from 'reselect';

const selectArOperations = state => state.get('arOperationsReducer');

const makeGetArOpsConfigList = () =>
  createSelector(selectArOperations, items => [
    ...items.get('ArOpsConfigList'),
  ]);
const makeErrorMessageArOpsConfig = () =>
  createSelector(selectArOperations, item =>
    item.get('errorMessageOpsConfigList'),
  );

// ----adjustments
const makePageAdjustmentParams = () =>
  createSelector(selectArOperations, item =>
    item.get('paramsAdjustment').toJS(),
  );

const makeGetListAdjustments = () =>
  createSelector(selectArOperations, items => [
    ...items.get('listAdjustments'),
  ]);

const makeErrorMessageAdjustments = () =>
  createSelector(selectArOperations, item =>
    item.get('errorMessageAdjustments'),
  );

const makeAdjustmentDetail = () =>
  createSelector(selectArOperations, item => item.get('adjustmentDetail'));
// ----disputes
const makePageDisputeParams = () =>
  createSelector(selectArOperations, item => item.get('paramsDispute').toJS());

const makeGetListDisputes = () =>
  createSelector(selectArOperations, items => [...items.get('listDisputes')]);

const makeErrorMessageDisputes = () =>
  createSelector(selectArOperations, item => item.get('errorMessageDisputes'));

const makeDisputeDetail = () =>
  createSelector(selectArOperations, item => item.get('disputeDetail'));

// ----write-offs
const makePageWriteOffParams = () =>
  createSelector(selectArOperations, item =>
    item.get('paramsWriteOffs').toJS(),
  );

const makeGetListWriteOffs = () =>
  createSelector(selectArOperations, items => [...items.get('listWriteOffs')]);

const makeWiteOffsDetail = () =>
  createSelector(selectArOperations, item => item.get('writeOffsDetail'));

const makeErrorMessageWriteOffs = () =>
  createSelector(selectArOperations, item => item.get('errorMessageWriteOffs'));

export {
  makeGetArOpsConfigList,
  makeErrorMessageArOpsConfig,
  makeGetListAdjustments,
  makePageAdjustmentParams,
  makeErrorMessageAdjustments,
  makeGetListDisputes,
  makePageDisputeParams,
  makeErrorMessageDisputes,
  makeGetListWriteOffs,
  makePageWriteOffParams,
  makeErrorMessageWriteOffs,
  makeDisputeDetail,
  makeWiteOffsDetail,
  makeAdjustmentDetail,
};
