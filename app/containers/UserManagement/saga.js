import { call, put, takeLatest } from 'redux-saga/effects';
// import { push } from 'react-router-redux';
import { queryRequest, mutationRequest } from 'utils/request';
import {
  searchRoles,
  getRoleById,
  modifyRole,
  searchRoleGroups,
  getRoleGroupById,
  modifyRoleGroup,
  createRoleGroup,
  searchUsers,
  getUserById,
} from 'api';
import {
  resetNotification,
  setNotification,
} from 'containers/Notification/actions';
import { NotificationTypes } from 'constantsApp';
import { isConnecting, isEndConnected } from '../Loader/actions';
import * as types from './types';
import * as actions from './actions';

// ------ search roles
export function* searchRolesSaga({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter, sort } = payload;
    const response = yield call(
      queryRequest,
      searchRoles({ page, size, filter, sort }),
    );
    if (response.searchRoles) {
      yield put(actions.searchRolesSuccess(response.searchRoles));
    } else {
      yield put(
        actions.searchRolesFailure(
          'Failed to fetch roles. Please try again or check your network!',
        ),
      );
    }
    if (cb) {
      cb();
    }
    yield put(isEndConnected());
  } catch (err) {
    if (cb) {
      cb();
    }

    yield put(isEndConnected());

    yield put(
      actions.searchRolesFailure(
        'Failed to fetch roles. Please try again or check your network!',
      ),
    );
  }
}

// ------ search Role by Id
export function* getRoleByIdSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const { id } = payload;
    const response = yield call(queryRequest, getRoleById(id));
    if (response.getRoleById) {
      if (cb) {
        cb({ success: true, data: response.getRoleById });
      }
    } else {
      if (cb) {
        cb({ success: false });
      }
      yield put(
        setNotification({
          type: NotificationTypes.error,
          message:
            'Failed to fetch roles. Please try again or check your network!',
        }),
      );
    }

    yield put(isEndConnected());
  } catch (err) {
    if (cb) {
      cb({ success: false });
    }

    yield put(isEndConnected());

    yield put(
      setNotification({
        type: NotificationTypes.error,
        message:
          'Failed to fetch roles. Please try again or check your network!',
      }),
    );
  }
}

// ------ modify Role
export function* modifyRoleSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const { rolesInput } = payload;
    const response = yield call(mutationRequest, modifyRole(rolesInput));
    if (response.modifyRole) {
      if (cb) {
        cb(true);
      }
      yield put(
        setNotification({
          type: NotificationTypes.success,
          message: `Modify Role successfully `,
        }),
      );
    } else {
      if (cb) {
        cb(false);
      }
      yield put(
        setNotification({
          type: NotificationTypes.error,
          message: `Modify Role failed `,
        }),
      );
    }

    yield put(isEndConnected());
  } catch (err) {
    if (cb) {
      cb(false);
    }
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Modify Role failed `,
      }),
    );
    yield put(isEndConnected());
  }
}
export function* searchRoleGroupsSaga({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter, sort } = payload;
    const response = yield call(
      queryRequest,
      searchRoleGroups({ page, size, filter, sort }),
    );

    if (response.searchRoleGroups) {
      yield put(actions.searchRoleGroupsSuccess(response.searchRoleGroups));
    } else {
      yield put(
        actions.searchRoleGroupsFailure(
          'Failed to fetch role groups. Please try again or check your network!',
        ),
      );
    }
    if (cb) {
      cb();
    }
    yield put(isEndConnected());
  } catch (err) {
    if (cb) {
      cb();
    }

    yield put(isEndConnected());

    yield put(
      actions.searchRoleGroupsFailure(
        'Failed to fetch role groups. Please try again or check your network!',
      ),
    );
  }
}

// ------ get Role Group
export function* getRoleGroupByIdSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const { id } = payload;
    const response = yield call(queryRequest, getRoleGroupById(id));
    if (response.getRoleGroupById) {
      if (cb) {
        cb({ success: true, data: response.getRoleGroupById });
      }
    } else {
      if (cb) {
        cb({ success: false });
      }
      yield put(
        setNotification({
          type: NotificationTypes.error,
          message:
            'Failed to fetch role groups. Please try again or check your network!',
        }),
      );
    }

    yield put(isEndConnected());
  } catch (err) {
    if (cb) {
      cb({ success: false });
    }
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message:
          'Failed to fetch role groups. Please try again or check your network!',
      }),
    );
  }
}

// ------ modify Role Group
export function* modifyRoleGroupSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const { roleGroupInput } = payload;
    const response = yield call(
      mutationRequest,
      modifyRoleGroup(roleGroupInput),
    );
    if (response.modifyRoleGroup) {
      if (cb) {
        cb({ success: true, response: response.modifyRoleGroup });
      }
      yield put(
        setNotification({
          type: NotificationTypes.success,
          message: `Modify Role Group successfully `,
        }),
      );
    } else {
      if (cb) {
        cb({ success: false });
      }
      yield put(
        setNotification({
          type: NotificationTypes.error,
          message: `Modify Role Group failed `,
        }),
      );
    }

    yield put(isEndConnected());
  } catch (err) {
    if (cb) {
      cb({ success: false });
    }
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Modify Role Group failed `,
      }),
    );
    yield put(isEndConnected());
  }
}
// createRoleGroup
export function* createRoleGroupSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const { roleGroupInput } = payload;
    const response = yield call(
      mutationRequest,
      createRoleGroup(roleGroupInput),
    );
    if (response.createRoleGroup) {
      if (cb) {
        cb({ success: true });
      }
      yield put(
        setNotification({
          type: NotificationTypes.success,
          message: `Create Role Group successfully `,
        }),
      );
    } else {
      if (cb) {
        cb({ success: false });
      }
      yield put(
        setNotification({
          type: NotificationTypes.error,
          message: `Create Role Group failed `,
        }),
      );
    }

    yield put(isEndConnected());
  } catch (err) {
    if (cb) {
      cb({ success: false });
    }
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: `Create Role failed `,
      }),
    );
    yield put(isEndConnected());
  }
}
// ------ get list users
export function* searchUsersSaga({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter, sort } = payload;
    const response = yield call(
      queryRequest,
      searchUsers({ page, size, filter, sort }),
    );
    if (response.searchUsers) {
      yield put(actions.searchUserSuccess(response.searchUsers));
    } else {
      yield put(
        actions.searchUsersFailure(
          'Failed to fetch users. Please try again or check your network!',
        ),
      );
    }
    if (cb) {
      cb();
    }
    yield put(isEndConnected());
  } catch (err) {
    yield put(isEndConnected());
    if (cb) {
      cb();
    }
    yield put(
      actions.searchUsersFailure(
        'Failed to fetch users. Please try again or check your network!',
      ),
    );
  }
}

// ------ get user by Id
export function* getUserByIdSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const { id } = payload;
    const response = yield call(queryRequest, getUserById(id));
    if (response.getUserById) {
      if (cb) {
        cb(response.getUserById, true);
      }
      yield put(actions.getUserByIdSuccess(response.getUserById));
    } else {
      if (cb) {
        cb({}, false);
      }
      yield put(
        setNotification({
          type: NotificationTypes.error,
          message:
            'Failed to fetch role groups. Please try again or check your network!',
        }),
      );
    }

    yield put(isEndConnected());
  } catch (err) {
    if (cb) {
      cb({}, false);
    }

    yield put(isEndConnected());

    yield put(
      setNotification({
        type: NotificationTypes.error,
        message:
          'Failed to fetch role groups. Please try again or check your network!',
      }),
    );
  }
}

export default function* collectionsSaga() {
  yield takeLatest(types.SEARCH_ROLES, searchRolesSaga);
  yield takeLatest(types.GET_ROLES_BY_ID, getRoleByIdSaga);
  yield takeLatest(types.MODIFY_ROLE, modifyRoleSaga);
  yield takeLatest(types.SEARCH_ROLE_GROUPS, searchRoleGroupsSaga);
  yield takeLatest(types.GET_ROLE_GROUP_BY_ID, getRoleGroupByIdSaga);
  yield takeLatest(types.MODIFY_ROLE_GROUP, modifyRoleGroupSaga);
  yield takeLatest(types.CREATE_ROLE_GROUP, createRoleGroupSaga);
  yield takeLatest(types.SEARCH_USERS, searchUsersSaga);
  yield takeLatest(types.GET_USER_BY_ID, getUserByIdSaga);
}
