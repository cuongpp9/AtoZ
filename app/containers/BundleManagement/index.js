import React, { Component } from 'react';
import { compose } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { RouteManager } from 'constantsApp';
import reducer from './reducer';
import saga from './saga';

import IndexPage from './BundleIndex';
import DetailPage from './BundleDetail';
import CreatePage from './BundleCreate';

class PrincingManager extends Component {
  componentDidMount() {
    console.log('componentDidMount');
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path={`/${RouteManager.bundleManagement.name}/:childRoute`}
          component={IndexPage}
        />
        <Route
          exact
          path={RouteManager.bundleManagement.mainRoute}
          render={() => <Redirect to={RouteManager.bundleManagement.bundle.route}/>}
        />
        <Route
          exact
          path={`/${RouteManager.bundleManagement.name}/:childRoute/:id/detail`}
          component={DetailPage}
        />
        <Route
          exact
          path={`/${RouteManager.bundleManagement.name}/:childRoute/create`}
          component={CreatePage}
        />
        <Route
          exact
          path={`/${RouteManager.bundleManagement.name}/:childRoute/:id`}
          render={({ match }) => (
            <Redirect to={`/${RouteManager.bundleManagement.name}/${match.params.childRoute}/${match.params.id}/detail`} />
          )}
        />
      </Switch>
    );
  }
}

const withReducer = injectReducer({ key: 'bundleManagementReducer', reducer });
const withSaga = injectSaga({ key: 'bundleManagementSaga', saga });

export default compose(
  withReducer,
  withSaga,
)(PrincingManager);
