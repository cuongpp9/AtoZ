import { SET_NOTIFICATION, RESET_NOTIFICATION } from './types';

// notification
export function setNotification(payload) {
  return {
    type: SET_NOTIFICATION,
    payload,
  };
}

export function resetNotification() {
  return {
    type: RESET_NOTIFICATION,
  };
}