import { createSelector } from 'reselect';

const selectLoader = state => state.get('loaderReducer');

const makeLoaderState = () =>
  createSelector(selectLoader, loader => loader.get('isConnecting'));

export default makeLoaderState;
