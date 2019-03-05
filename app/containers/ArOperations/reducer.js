import { fromJS } from 'immutable';
import * as types from './types';

export const initialState = fromJS({
  isFetchingSuccess: false,
  isPostingSuccess: false,
  listAdjustments: [],
  adjustmentDetail: {},
  errorMessageAdjustments: '',
  paramsAdjustment: {
    page: 1,
    size: 20,
    filter: {},
    sort: {},
  },
  listDisputes: [],
  errorMessageDisputes: '',
  errorMessageSettlement: '',
  disputeDetail: {},
  paramsDispute: {
    page: 1,
    size: 20,
    filter: {},
    sort: {},
  },
  listWriteOffs: [],
  writeOffsDetail: {},
  errorMessageWriteOffs: '',
  paramsWriteOffs: {
    page: 1,
    size: 20,
    filter: {},
    sort: {},
  },
});

export default function(state = initialState, action) {
  switch (action.type) {
    // -------Adjustments
    case types.SEARCH_ADJUSTMENTS:
      return state
        .set('errorMessageAdjustments', '')
        .set('isFetchingSuccess', false);
    case types.SEARCH_ADJUSTMENTS_SUCCESS:
      return state
        .set('listAdjustments', action.payload)
        .set('isFetchingSuccess', true);
    case types.SEARCH_ADJUSTMENTS_FAILURE:
      return state.set('errorMessageAdjustments', action.payload);
    case types.SET_PARAMS_ADJUSTMENTS: {
      const { page, size } = action.payload;
      return state
        .setIn(['paramsAdjustment', 'size'], size)
        .setIn(['paramsAdjustment', 'page'], page);
    }
    case types.GET_ADJUSTMENT_DETAIL:
      return state
        .set('errorMessageAdjustments', '')
        .set('adjustmentDetail', {});
    case types.GET_ADJUSTMENT_DETAIL_SUCCESS:
      return state.set('adjustmentDetail', action.payload);
    case types.GET_ADJUSTMENT_DETAIL_FAILED:
      return state.set('errorMessageAdjustments', action.payload);
    // -------Disputes
    case types.SEARCH_DISPUTES:
      return state
        .set('errorMessageDisputes', '')
        .set('isFetchingSuccess', false);
    case types.SEARCH_DISPUTES_SUCCESS:
      return state
        .set('listDisputes', action.payload)
        .set('isFetchingSuccess', true);
    case types.SEARCH_DISPUTES_FAILURE:
      return state.set('errorMessageDisputes', action.payload);
    case types.SET_PARAMS_DISPUTES: {
      const { page, size } = action.payload;
      return state
        .setIn(['paramsDispute', 'size'], size)
        .setIn(['paramsDispute', 'page'], page);
    }
    case types.GET_DISPUTE_DETAIL:
      return state.set('disputeDetail', {}).set('errorMessageDisputes', '');
    case types.GET_DISPUTE_DETAIL_SUCCESS:
      return state.set('disputeDetail', action.payload);
    case types.GET_DISPUTE_DETAIL_FAILED:
      return state.set('errorMessageDisputes', action.payload);
    // -------Write-offs
    case types.SEARCH_WRITE_OFFS:
      return state
        .set('errorMessageWriteOffs', '')
        .set('isFetchingSuccess', false);
    case types.SEARCH_WRITE_OFFS_SUCCESS:
      return state
        .set('listWriteOffs', action.payload)
        .set('isFetchingSuccess', true);
    case types.SEARCH_WRITE_OFFS_FAILURE:
      return state.set('errorMessageWriteOffs', action.payload);
    case types.SET_PARAMS_WRITE_OFFS: {
      const { page, size } = action.payload;
      return state
        .setIn(['paramsWriteOffs', 'size'], size)
        .setIn(['paramsWriteOffs', 'page'], page);
    }
    case types.GET_WRITE_OFFS_DETAIL:
      return state.set('writeOffsDetail', {}).set('errorMessageWriteOffs', '');
    case types.GET_WRITE_OFFS_DETAIL_SUCCESS:
      return state.set('writeOffsDetail', action.payload);
    case types.GET_WRITE_OFFS_DETAIL_FAILED:
      return state.set('errorMessageWriteOffs', action.payload);
    default:
      return state;
  }
}
