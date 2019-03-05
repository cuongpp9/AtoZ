import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { queryRequest, mutationRequest } from 'utils/request';
import { handleError } from 'utils/utils';
import {
  searchBundles,
  getBundleDetail,
  createBundle,
  modifyBundle,
  updateBundleStatus,
  searchPackages,
  searchDependencies,
  getPackageDetail,
  getDependencyDetail,
  createPackage,
  modifyPackage,
  updatePackageStatus,
  createDependency,
  modifyDependency,
} from 'api';
import {
  resetNotification,
  setNotification,
} from 'containers/Notification/actions';
import { NotificationTypes } from 'constantsApp';
import { isConnecting, isEndConnected } from '../Loader/actions';
import * as types from './types';
import * as actions from './actions';

export function* searchListBundles({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter, sort } = payload;
    const response = yield call(
      queryRequest,
      searchBundles({ page, size, filter, sort }),
    );
    yield put(actions.searchBundlesSuccess(response.searchBundles));
    yield put(isEndConnected());
    if (cb) cb();
  } catch (err) {
    yield put(
      actions.searchBundlesFailure(
        handleError(
          err,
          'Failed to fetch bundles. Please check your network and try again!',
        ),
      ),
    );
    yield put(isEndConnected());
    if (cb) cb();
  }
}

export function* getBundleSaga({ payload }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const response = yield call(queryRequest, getBundleDetail(payload));
    if (response.getBundleById) {
      yield put(actions.getBundleDetailSuccess(response.getBundleById));
    } else {
      yield put(
        actions.getBundleDetailFailure(
          `Can not get Bundle Info for ${payload}`,
        ),
      );
    }
    yield put(isEndConnected());
  } catch (err) {
    yield put(
      actions.getBundleDetailFailure(
        handleError(err, `Can not get Bundle Info for ${payload}`),
      ),
    );
    yield put(isEndConnected());
  }
}

export function* createBundleSaga({ payload, cb }) {
  yield put(isConnecting());
  try {
    const dataCreate = payload;
    const response = yield call(mutationRequest, createBundle(dataCreate));
    yield put(actions.createBundleSuccess(response.createBundle));
    yield cb();
    yield put(isEndConnected());
    yield put(
      push(`/bundle-management/bundle/${response.createBundle.id}/detail`),
    );
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'Bundle created successfully!',
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield cb();
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: 'Bundle created failed!',
      }),
    );
  }
}

export function* modifyBundleSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataCreate = payload;
    const response = yield call(mutationRequest, modifyBundle(dataCreate));
    yield put(actions.modifyBundleSuccess(response.modifyBundle));
    yield cb({ success: true });
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'Bundle updated successfully!',
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: 'Bundle updated failed!',
      }),
    );
    cb({ success: false });
  }
}

export function* updateBundleStatusSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const response = yield call(mutationRequest, updateBundleStatus(payload));
    yield put(actions.updateBundleStatusSuccess(response.updateBundleStatus));
    yield cb({ success: true });
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: "Bundle's status updated successfully!",
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: "Bundle's status updated failed!",
      }),
    );
    cb({ success: false });
  }
}

// ------Package
export function* searchListPackages({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter, sort } = payload;
    const response = yield call(
      queryRequest,
      searchPackages({ page, size, filter, sort }),
    );
    yield put(actions.searchPackagesSuccess(response.searchPackages));
    yield put(isEndConnected());
    if (cb) cb();
  } catch (err) {
    yield put(
      actions.searchBundlesFailure(
        handleError(
          err,
          'Failed to fetch packages. Please check your network and try again!',
        ),
      ),
    );
    yield put(isEndConnected());
    if (cb) cb();
  }
}

export function* getPackageSaga({ payload }) {
  yield put(isConnecting());
  try {
    const response = yield call(queryRequest, getPackageDetail(payload));
    if (response.getPackageById) {
      yield put(actions.getPackageDetailSuccess(response.getPackageById));
    } else {
      yield put(
        actions.getPackageDetailFailure(
          `Can not get Package Info for ${payload}`,
        ),
      );
    }
    yield put(isEndConnected());
  } catch (err) {
    yield put(
      actions.getPackageDetailFailure(
        handleError(err),
        `Can not get Package Info for ${payload}`,
      ),
    );
    yield put(isEndConnected());
  }
}

export function* createPackageSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataCreate = payload;
    const response = yield call(mutationRequest, createPackage(dataCreate));
    yield put(actions.createPackageSuccess(response.createPackage));
    yield cb();
    yield put(isEndConnected());
    yield put(
      push(`/bundle-management/packages/${response.createPackage.id}/detail`),
    );
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'Package created successfully!',
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield cb();
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: 'Package created failed!',
      }),
    );
  }
}

export function* modifyPackageSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataCreate = payload;
    const response = yield call(mutationRequest, modifyPackage(dataCreate));
    yield put(actions.modifyPackageSuccess(response.modifyPackage));
    yield cb({ success: true });
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'Package updated successfully!',
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: 'Package updated failed!',
      }),
    );
    cb({ success: false });
  }
}

export function* updatePackageStatusSaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const response = yield call(mutationRequest, updatePackageStatus(payload));
    yield put(actions.updatePackageStatusSuccess(response.updatePackageStatus));
    yield cb({ success: true });
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: "Package's status updated successfully!",
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: "Package's status updated failed!",
      }),
    );
    cb({ success: false });
  }
}

// ---dependency
export function* searchListDependencies({ payload, cb }) {
  yield put(isConnecting());
  try {
    const { page, size, filter, sort } = payload;
    const response = yield call(
      queryRequest,
      searchDependencies({ page, size, filter, sort }),
    );
    yield put(actions.searchDependenciesSuccess(response.searchDependencies));
    yield put(isEndConnected());
    if (cb) cb();
  } catch (err) {
    yield put(
      actions.searchBundlesFailure(
        handleError(
          err,
          'Failed to fetch dependencies. Please check your network and try again!',
        ),
      ),
    );
    yield put(isEndConnected());
    if (cb) cb();
  }
}

export function* getDependencySaga({ payload }) {
  yield put(isConnecting());
  try {
    const response = yield call(queryRequest, getDependencyDetail(payload));
    if (response.getDependencyById) {
      yield put(actions.getDependencyDetailSuccess(response.getDependencyById));
    } else {
      yield put(
        actions.getDependencyDetailFailure(
          `Can not get Dependency Info for ${payload}`,
        ),
      );
    }
    yield put(isEndConnected());
  } catch (err) {
    yield put(
      actions.getDependencyDetailFailure(
        handleError(err),
        `Can not get Dependency Info for ${payload}`,
      ),
    );
    yield put(isEndConnected());
  }
}

export function* createDependencySaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataCreate = payload;
    const response = yield call(mutationRequest, createDependency(dataCreate));
    yield put(actions.createDependencySuccess(response.createDependency));
    yield cb();
    yield put(isEndConnected());
    yield put(
      push(
        `/bundle-management/dependency/${response.createDependency.id}/detail`,
      ),
    );
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'Dependency created successfully!',
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield cb();
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: 'Dependency created failed!',
      }),
    );
  }
}

export function* modifyDependencySaga({ payload, cb }) {
  yield put(isConnecting());
  yield put(resetNotification());
  try {
    const dataCreate = payload;
    const response = yield call(mutationRequest, modifyDependency(dataCreate));
    yield put(actions.modifyDependencySuccess(response.modifyDependency));
    yield cb({ success: true });
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.success,
        message: 'Dependency updated successfully!',
      }),
    );
  } catch (err) {
    yield put(isEndConnected());
    yield put(
      setNotification({
        type: NotificationTypes.error,
        message: 'Dependency updated failed!',
      }),
    );
    cb({ success: false });
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* bundleManagementSaga() {
  yield takeLatest(types.SEARCH_BUNDLES, searchListBundles);
  yield takeLatest(types.GET_BUNDLE_DETAIL, getBundleSaga);
  yield takeLatest(types.CREATE_BUNDLE, createBundleSaga);
  yield takeLatest(types.MODIFY_BUNDLE, modifyBundleSaga);
  yield takeLatest(types.UPDATE_BUNDLE_STATUS, updateBundleStatusSaga);

  yield takeLatest(types.SEARCH_PACKAGES, searchListPackages);
  yield takeLatest(types.GET_PACKAGE_DETAIL, getPackageSaga);
  yield takeLatest(types.CREATE_PACKAGE, createPackageSaga);
  yield takeLatest(types.MODIFY_PACKAGE, modifyPackageSaga);
  yield takeLatest(types.UPDATE_PACKAGE_STATUS, updatePackageStatusSaga);

  yield takeLatest(types.SEARCH_DEPENDENCIES, searchListDependencies);
  yield takeLatest(types.GET_DEPENDENCY_DETAIL, getDependencySaga);
  yield takeLatest(types.CREATE_DENPENDENCY, createDependencySaga);
  yield takeLatest(types.MODIFY_DENPENDENCY, modifyDependencySaga);
}
