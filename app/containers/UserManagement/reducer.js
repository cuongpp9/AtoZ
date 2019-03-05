import { fromJS } from 'immutable';
import * as types from './types';

export const initialState = fromJS({
  // search roles
  paramsRoles: {
    page: 1,
    size: 20,
    filter: {},
    sort: {},
  },
  listRoles: [],
  errorMessageRoles: '',

  // search role groups
  paramsRoleGroups: {
    page: 1,
    size: 20,
    filter: {},
    sort: {},
  },
  listRoleGroups: [],
  errorMessageRoleGroup: '',

  // search users
  paramsUsers: {
    page: 1,
    size: 20,
    filter: {},
    sort: {},
  },
  listUsers: [],
  userSelected: {},
  errorMessageUsers: '',
});

export default function(state = initialState, action) {
  switch (action.type) {
    // -------Search Roles
    case types.SEARCH_ROLES: {
      return state.set('errorMessageRoles', '');
    }
    case types.SEARCH_ROLES_SUCCESS:
      return state.set('listRoles', action.payload);
    case types.SEARCH_ROLES_FAILURE:
      return state.set('errorMessageRoles', action.payload);
    case types.SET_PARAMS_ROLES: {
      const { page, size } = action.payload;
      return state
        .setIn(['paramsRoles', 'size'], size)
        .setIn(['paramsRoles', 'page'], page);
    }

    // -------Search Role Groups
    case types.SEARCH_ROLE_GROUPS: {
      return state.set('errorMessageRoleGroups', '');
    }
    case types.SEARCH_ROLE_GROUPS_SUCCESS:
      return state.set('listRoleGroups', action.payload);
    case types.SEARCH_ROLE_GROUPS_FAILURE:
      return state.set('errorMessageRoleGroups', action.payload);
    case types.SET_PARAMS_ROLE_GROUPS: {
      const { page, size } = action.payload;
      return state
        .setIn(['paramsRoleGroups', 'size'], size)
        .setIn(['paramsRoleGroups', 'page'], page);
    }

    // -------Search Users
    case types.SEARCH_USERS: {
      return state.set('errorMessageUsers', '');
    }
    case types.SEARCH_USERS_SUCCESS: {
      return state.set('listUsers', action.payload);
    }
    case types.SEARCH_USERS_FAILURE: {
      return state.set('errorMessageUsers', action.payload);
    }
    case types.SET_PARAMS_LIST_USERS: {
      const { page, size } = action.payload;
      return state
        .setIn(['paramsUsers', 'size'], size)
        .setIn(['paramsUsers', 'page'], page);
    }
    case types.GET_ACCOUNT_DETAIL:
      return state.set('accountSelected', {});

    case types.GET_USER_BY_ID_SUCCESS:
      return state.set('userSelected', action.payload);

    default:
      return state;
  }
}
