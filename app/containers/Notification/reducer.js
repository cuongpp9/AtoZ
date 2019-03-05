import { fromJS } from 'immutable';
import { NotificationTypes } from 'constantsApp';

import { SET_NOTIFICATION, RESET_NOTIFICATION } from './types';

// The initial state of the App
const initialState = fromJS({
  notification: {
    type: NotificationTypes.none,
    message: '',
  },
});

function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NOTIFICATION:
      return state
        .setIn(['notification', 'type'], action.payload.type)
        .setIn(['notification', 'message'], action.payload.message);
    case RESET_NOTIFICATION:
      return state
        .setIn(['notification', 'type'], NotificationTypes.none)
        .setIn(['notification', 'message'], '');
    default:
      return state;
  }
}

export default notificationReducer;
