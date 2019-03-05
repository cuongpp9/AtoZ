import * as types from './types';
// ---------bundles
export function setParamsBundles(payload) {
  return {
    type: types.SET_PARAMS_BUNDLES,
    payload,
  };
}

export function searchBundles(payload, cb) {
  return {
    type: types.SEARCH_BUNDLES,
    payload,
    cb,
  };
}

export function searchBundlesSuccess(payload) {
  return {
    type: types.SEARCH_BUNDLES_SUCCESS,
    payload,
  };
}

export function searchBundlesFailure(payload) {
  return {
    type: types.SEARCH_BUNDLES_FAILURE,
    payload,
  };
}

export function getBundleDetail(payload) {
  return {
    type: types.GET_BUNDLE_DETAIL,
    payload,
  };
}

export function getBundleDetailSuccess(payload) {
  return {
    type: types.GET_BUNDLE_DETAIL_SUCCESS,
    payload,
  };
}

export function getBundleDetailFailure(payload) {
  return {
    type: types.GET_BUNDLE_DETAIL_FAILURE,
    payload,
  };
}

export function createBundle(payload, cb) {
  return {
    type: types.CREATE_BUNDLE,
    payload,
    cb,
  };
}

export function createBundleSuccess(payload) {
  return {
    type: types.CREATE_BUNDLE_SUCCESS,
    payload,
  };
}

export function createBundleFailure(payload) {
  return {
    type: types.CREATE_BUNDLE_FAILURE,
    payload,
  };
}

// modify bundle
export function modifyBundle(payload, cb) {
  return {
    type: types.MODIFY_BUNDLE,
    payload,
    cb,
  };
}

export function modifyBundleSuccess(payload) {
  return {
    type: types.MODIFY_BUNDLE_SUCCESS,
    payload,
  };
}

// update bundle status
export function updateBundleStatus(payload, cb) {
  return {
    type: types.UPDATE_BUNDLE_STATUS,
    payload,
    cb,
  };
}

export function updateBundleStatusSuccess(payload) {
  return {
    type: types.UPDATE_BUNDLE_STATUS_SUCCESS,
    payload,
  };
}

// ---------packages
export function setParamsPackages(payload) {
  return {
    type: types.SET_PARAMS_PACKAGES,
    payload,
  };
}

export function searchPackages(payload, cb) {
  return {
    type: types.SEARCH_PACKAGES,
    payload,
    cb,
  };
}

export function searchPackagesSuccess(payload) {
  return {
    type: types.SEARCH_PACKAGES_SUCCESS,
    payload,
  };
}

export function searchPackagesFailure(payload) {
  return {
    type: types.SEARCH_PACKAGES_FAILURE,
    payload,
  };
}

export function getPackageDetail(payload) {
  return {
    type: types.GET_PACKAGE_DETAIL,
    payload,
  };
}

export function getPackageDetailSuccess(payload) {
  return {
    type: types.GET_PACKAGE_DETAIL_SUCCESS,
    payload,
  };
}

export function getPackageDetailFailure(payload) {
  return {
    type: types.GET_PACKAGE_DETAIL_FAILURE,
    payload,
  };
}

export function createPackage(payload, cb) {
  return {
    type: types.CREATE_PACKAGE,
    payload,
    cb,
  };
}

export function createPackageSuccess(payload) {
  return {
    type: types.CREATE_PACKAGE_SUCCESS,
    payload,
  };
}

export function createPackageFailure(payload) {
  return {
    type: types.CREATE_PACKAGE_FAILURE,
    payload,
  };
}

// modify package
export function modifyPackage(payload, cb) {
  return {
    type: types.MODIFY_PACKAGE,
    payload,
    cb,
  };
}

export function modifyPackageSuccess(payload) {
  return {
    type: types.MODIFY_PACKAGE_SUCCESS,
    payload,
  };
}

// update package status
export function updatePackageStatus(payload, cb) {
  return {
    type: types.UPDATE_PACKAGE_STATUS,
    payload,
    cb,
  };
}

export function updatePackageStatusSuccess(payload) {
  return {
    type: types.UPDATE_PACKAGE_STATUS_SUCCESS,
    payload,
  };
}

// ----dependencies
export function searchDependencies(payload, cb) {
  return {
    type: types.SEARCH_DEPENDENCIES,
    payload,
    cb,
  };
}

export function searchDependenciesSuccess(payload) {
  return {
    type: types.SEARCH_DEPENDENCIES_SUCCESS,
    payload,
  };
}

export function searchDependenciesFailure(payload) {
  return {
    type: types.SEARCH_DEPENDENCIES_FAILURE,
    payload,
  };
}

export function setParamsDependencies(payload) {
  return {
    type: types.SET_PARAMS_DEPENDENCIES,
    payload,
  };
}

export function getDependencyDetail(payload) {
  return {
    type: types.GET_DEPENDENCY_DETAIL,
    payload,
  };
}

export function getDependencyDetailSuccess(payload) {
  return {
    type: types.GET_DEPENDENCY_DETAIL_SUCCESS,
    payload,
  };
}

export function getDependencyDetailFailure(payload) {
  return {
    type: types.GET_DEPENDENCY_DETAIL_FAILURE,
    payload,
  };
}

export function createDependency(payload, cb) {
  return {
    type: types.CREATE_DENPENDENCY,
    payload,
    cb,
  };
}

export function createDependencySuccess(payload) {
  return {
    type: types.CREATE_DENPENDENCY_SUCCESS,
    payload,
  };
}

export function createDependencyFailure(payload) {
  return {
    type: types.CREATE_DENPENDENCY_FAILURE,
    payload,
  };
}

// modify dependency
export function modifyDependency(payload, cb) {
  return {
    type: types.MODIFY_DENPENDENCY,
    payload,
    cb,
  };
}

export function modifyDependencySuccess(payload) {
  return {
    type: types.MODIFY_DENPENDENCY_SUCCESS,
    payload,
  };
}
