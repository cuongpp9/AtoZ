import { createSelector } from 'reselect';

const selectCollections = state => state.get('userManagementReducer');

// ----search Roles

const makeGetlistRoles = () =>
  createSelector(selectCollections, items => [...items.get('listRoles')]);

const makePageRolesParams = () =>
  createSelector(selectCollections, item => item.get('paramsRoles').toJS());

const errorMessageRoles = () =>
  createSelector(selectCollections, item => item.get('errorMessageRoles'));

// ----search Roles

const makeGetlistRoleGroups = () =>
  createSelector(selectCollections, items => [...items.get('listRoleGroups')]);

const makePageRoleGroupsParams = () =>
  createSelector(selectCollections, item =>
    item.get('paramsRoleGroups').toJS(),
  );

const errorMessageRoleGroups = () =>
  createSelector(selectCollections, item => item.get('errorMessageRoleGroups'));

// ----search Users
const makeGetListUsers = () =>
  createSelector(selectCollections, items => [...items.get('listUsers')]);

const makePageSearchUsersParams = () =>
  createSelector(selectCollections, item => item.get('paramsUsers').toJS());

const errorMessageUsers = () =>
  createSelector(selectCollections, item => item.get('errorMessageUsers'));

const makeUserDetail = () =>
  createSelector(selectCollections, item => item.get('userSelected'));

export {
  makeGetlistRoles,
  makePageRolesParams,
  errorMessageRoles,
  makeGetlistRoleGroups,
  makePageRoleGroupsParams,
  errorMessageRoleGroups,
  makeGetListUsers,
  makePageSearchUsersParams,
  errorMessageUsers,
  makeUserDetail,
};
