import React, { Component } from 'react';
import { compose } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

import CollectionAdmin from './CollectionAdmin';
import CollectionAgent from './CollectionAgent';
class Collections extends Component {
  componentDidMount() {
    console.log('componentDidMount');
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/collections"
          render={() => (
            <Redirect to="/collections/collection-admin/collection-config" />
          )}
        />
        <Route
          exact
          path="/collections/collection-admin/:childRoute"
          component={CollectionAdmin}
        />
        <Route
          exact
          path="/collections/collection-admin"
          render={() => (
            <Redirect to="/collections/collection-admin/collection-config" />
          )}
        />

        <Route
          exact
          path="/collections/collection-agent/:childRoute/:id?"
          component={CollectionAgent}
        />
        <Route
          exact
          path="/collections/collection-agent"
          render={() => (
            <Redirect to="/collections/collection-agent/search-accounts" />
          )}
        />
      </Switch>
    );
  }
}

const withReducer = injectReducer({ key: 'collectionsReducer', reducer });
const withSaga = injectSaga({ key: 'collectionsSaga', saga });

export default compose(
  withReducer,
  withSaga,
)(Collections);
