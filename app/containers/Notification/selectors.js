import { createSelector } from 'reselect';

const selectNotification = state => state.get('notificationReducer');

const makeSelectNotification = () =>
  createSelector(selectNotification, state => state.get('notification').toJS());

export { makeSelectNotification };
