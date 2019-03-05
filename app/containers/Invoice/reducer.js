import { fromJS } from 'immutable';
import * as types from './types';

export const initialState = fromJS({
  errorMessage: '',
});

export default function(state = initialState, action) {
  switch (action.type) {
    // -------invoices
    case types.GET_INVOICE_BY_ID:
      return state.set('errorMessage', '');
    case types.GET_INVOICE_BY_ID_FAILED:
      return state.set('errorMessage', action.payload);
    default:
      return state;
  }
}
