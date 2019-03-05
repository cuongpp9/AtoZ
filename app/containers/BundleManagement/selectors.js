/**
 * Bundle Management selectors
 */

import { createSelector } from 'reselect';

const selectBundleManager = state => state.get('bundleManagementReducer');

const makePageBundleParams = () =>
  createSelector(selectBundleManager, bundles =>
    bundles.get('paramsBundles').toJS(),
  );

const makeGetListBundles = () =>
  createSelector(selectBundleManager, bundles => [
    ...bundles.get('listBundles'),
  ]);

const makeGetBundleDetail = () =>
  createSelector(selectBundleManager, bundle => bundle.get('bundleInfo'));

// for Package
const makePagePackageParams = () =>
  createSelector(selectBundleManager, items =>
    items.get('paramsPackages').toJS(),
  );

const makeGetListPackages = () =>
  createSelector(selectBundleManager, items => [...items.get('listPackages')]);

const makeGetPackageDetail = () =>
  createSelector(selectBundleManager, item => item.get('packageInfo'));

// for dependencies
const makePageDependencyParams = () =>
  createSelector(selectBundleManager, items =>
    items.get('paramsDependencies').toJS(),
  );

const makeGetListDependencies = () =>
  createSelector(selectBundleManager, items => [
    ...items.get('listDependencies'),
  ]);

const makeGetDependencyDetail = () =>
  createSelector(selectBundleManager, item => item.get('dependencyInfo'));

// for get error message
const makeErrorMessage = () =>
  createSelector(selectBundleManager, bundle => bundle.get('errorMessage'));

export {
  makePageBundleParams,
  makeGetListBundles,
  makeGetBundleDetail,
  makePagePackageParams,
  makeGetListPackages,
  makePageDependencyParams,
  makeGetListDependencies,
  makeGetDependencyDetail,
  makeGetPackageDetail,
  makeErrorMessage,
};
