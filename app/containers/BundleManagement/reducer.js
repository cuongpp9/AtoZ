import { fromJS } from 'immutable';
import * as types from './types';

export const initialState = fromJS({
  errorMessage: '',
  isFetchingSuccess: false,
  isPostingSuccess: false,
  listBundles: [],
  listPackages: [],
  listDependencies: [],
  paramsBundles: {
    page: 1,
    size: 20,
    filter: {},
    sort: {},
  },
  paramsPackages: {
    page: 1,
    size: 20,
    filter: {},
    sort: {},
  },
  paramsDependencies: {
    page: 1,
    size: 20,
    filter: {},
    sort: {},
  },
  bundleInfo: {},
  packageInfo: {},
  dependencyInfo: {},
});

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SEARCH_BUNDLES:
      return state.set('errorMessage', '').set('isFetchingSuccess', false);
    case types.SEARCH_BUNDLES_SUCCESS:
      return state
        .set('listBundles', action.payload)
        .set('isFetchingSuccess', true);
    case types.SEARCH_BUNDLES_FAILURE:
      return state.set('errorMessage', action.payload);
    case types.SET_PARAMS_BUNDLES: {
      const { page, size } = action.payload;
      return state
        .setIn(['paramsBundles', 'size'], size)
        .setIn(['paramsBundles', 'page'], page);
    }

    // bundle detail
    case types.GET_BUNDLE_DETAIL:
      return state.set('bundleInfo', {});
    case types.GET_BUNDLE_DETAIL_FAILURE:
      return state.set('errorMessage', action.payload);
    case types.GET_BUNDLE_DETAIL_SUCCESS:
    case types.MODIFY_BUNDLE_SUCCESS:
      return state.set('bundleInfo', action.payload);
    // for update bundle' status
    case types.UPDATE_BUNDLE_STATUS_SUCCESS: {
      const bundleInfo = state.get('bundleInfo');
      bundleInfo.status = action.payload.status;
      return state.set('bundleInfo', Object.assign({}, bundleInfo));
    }
    // for package
    case types.SEARCH_PACKAGES:
      return state.set('errorMessage', '').set('isFetchingSuccess', false);
    case types.SEARCH_PACKAGES_SUCCESS:
      return state
        .set('listPackages', action.payload)
        .set('isFetchingSuccess', true);
    case types.SEARCH_PACKAGES_FAILURE:
      return state.set('errorMessage', action.payload);
    case types.SET_PARAMS_PACKAGES: {
      const { page, size } = action.payload;
      return state
        .setIn(['paramsPackages', 'size'], size)
        .setIn(['paramsPackages', 'page'], page);
    }
    // package detail
    case types.GET_PACKAGE_DETAIL:
      return state.set('packageInfo', {});
    case types.GET_PACKAGE_DETAIL_FAILURE:
      return state.set('errorMessage', action.payload);
    case types.GET_PACKAGE_DETAIL_SUCCESS:
    case types.MODIFY_PACKAGE_SUCCESS:
      return state.set('packageInfo', action.payload);
    // for update package' status
    case types.UPDATE_PACKAGE_STATUS_SUCCESS: {
      const packageInfo = state.get('packageInfo');
      packageInfo.status = action.payload.status;
      return state.set('packageInfo', Object.assign({}, packageInfo));
    }
    // for dependencies
    case types.SEARCH_DEPENDENCIES:
      return state.set('errorMessage', '').set('isFetchingSuccess', false);
    case types.SEARCH_DEPENDENCIES_SUCCESS:
      return state
        .set('listDependencies', action.payload)
        .set('isFetchingSuccess', true);
    case types.SEARCH_DEPENDENCIES_FAILURE:
      return state.set('errorMessage', action.payload);
    case types.SET_PARAMS_DEPENDENCIES: {
      const { page, size } = action.payload;
      return state
        .setIn(['paramsDependencies', 'size'], size)
        .setIn(['paramsDependencies', 'page'], page);
    }
    case types.GET_DEPENDENCY_DETAIL_FAILURE:
      return state.set('errorMessage', action.payload);
    case types.GET_DEPENDENCY_DETAIL:
      return state.set('dependencyInfo', {});
    case types.GET_DEPENDENCY_DETAIL_SUCCESS:
    case types.MODIFY_DENPENDENCY_SUCCESS:
      return state.set('dependencyInfo', action.payload);
    default:
      return state;
  }
}
