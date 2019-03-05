import * as types from './types';

export function searchRoles(payload, cb) {
  return {
    type: types.SEARCH_ROLES,
    payload,
    cb,
  };
}

export function searchRolesSuccess(payload) {
  return {
    type: types.SEARCH_ROLES_SUCCESS,
    payload,
  };
}

export function searchRolesFailure(payload) {
  return {
    type: types.SEARCH_ROLES_FAILURE,
    payload,
  };
}
export function setParamsRoles(payload) {
  return {
    type: types.SET_PARAMS_ROLES,
    payload,
  };
}

export function getRoleById(payload, cb) {
  return {
    type: types.GET_ROLES_BY_ID,
    payload,
    cb,
  };
}

export function getRoleByIdSuccess(payload) {
  return {
    type: types.GET_ROLES_BY_ID_SUCCESS,
    payload,
  };
}

export function getRoleByIdFailure(payload) {
  return {
    type: types.GET_ROLES_BY_ID_FAILURE,
    payload,
  };
}

export function modifyRole(payload, cb) {
  return {
    type: types.MODIFY_ROLE,
    payload,
    cb,
  };
}

export function searchRoleGroups(payload, cb) {
  return {
    type: types.SEARCH_ROLE_GROUPS,
    payload,
    cb,
  };
}

export function searchRoleGroupsSuccess(payload) {
  return {
    type: types.SEARCH_ROLE_GROUPS_SUCCESS,
    payload,
  };
}

export function searchRoleGroupsFailure(payload) {
  return {
    type: types.SEARCH_ROLE_GROUPS_FAILURE,
    payload,
  };
}
export function setParamsRoleGroups(payload) {
  return {
    type: types.SET_PARAMS_ROLE_GROUPS,
    payload,
  };
}

export function getRoleGroupById(payload, cb) {
  return {
    type: types.GET_ROLE_GROUP_BY_ID,
    payload,
    cb,
  };
}

export function modifyRoleGroup(payload, cb) {
  return {
    type: types.MODIFY_ROLE_GROUP,
    payload,
    cb,
  };
}

export function createRoleGroup(payload, cb) {
  return {
    type: types.CREATE_ROLE_GROUP,
    payload,
    cb,
  };
}
// <--  Users Management -->
// Search Users request
export function searchUsers(payload, cb) {
  return {
    type: types.SEARCH_USERS,
    payload,
    cb,
  };
}

export function searchUserSuccess(payload) {
  return {
    type: types.SEARCH_USERS_SUCCESS,
    payload,
  };
}

export function searchUsersFailure(payload) {
  return {
    type: types.SEARCH_USERS_FAILURE,
    payload,
  };
}

export function setParamsListUsers(payload) {
  return {
    type: types.SET_PARAMS_LIST_USERS,
    payload,
  };
}

// Detail User
export function getUserById(payload, cb) {
  return {
    type: types.GET_USER_BY_ID,
    payload,
    cb,
  };
}

export function getUserByIdSuccess(payload) {
  return {
    type: types.GET_USER_BY_ID_SUCCESS,
    payload,
  };
}

// export function getRoleByIdFailure(payload) {
//   return {
//     type: types.GET_ROLES_BY_ID_FAILURE,
//     payload,
//   };
// }
