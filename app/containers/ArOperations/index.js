import React, { Component } from 'react';
import { compose } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { RouteManager } from 'constantsApp';
import reducer from './reducer';
import saga from './saga';
import './styles.scss';
import ArOperationsIndex from './ArOperationsIndex';
import ArOperationsProcess from './ArOperationsProcess';
import ArOperationsDetail from './ArOperationsDetail';
class ArOperations extends Component {
  componentDidMount() {}

  render() {
    return (
      <Switch>
        <Route
          exact
          path={`/${RouteManager.arOperations.name}/:childRoute`}
          component={ArOperationsIndex}
        />
        <Route
          exact
          path={RouteManager.arOperations.mainRoute}
          render={() => <Redirect to={RouteManager.arOperations.adjustment.route} />}
        />
        <Route
          exact
          path={`/${RouteManager.arOperations.name}/:childRoute/apply`}
          component={ArOperationsProcess}
        />
        <Route
          exact
          path={`/${RouteManager.arOperations.name}/:childRoute/:id/detail`}
          component={ArOperationsDetail}
        />
      </Switch>
    );
  }
}

const withReducer = injectReducer({ key: 'arOperationsReducer', reducer });
const withSaga = injectSaga({ key: 'arOperationsSaga', saga });

export default compose(
  withReducer,
  withSaga,
)(ArOperations);
