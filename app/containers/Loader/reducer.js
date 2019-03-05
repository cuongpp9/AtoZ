import { fromJS } from 'immutable';
import { IS_CONNECTING, IS_END_CONNECT } from './types';

const initialState = fromJS({
  isConnecting: false,
});

export default function(state = initialState, action) {
  switch (action.type) {
    case IS_CONNECTING:
      return state.set('isConnecting', true);
    case IS_END_CONNECT:
      return state.set('isConnecting', false);
    default:
      return state;
  }
}
