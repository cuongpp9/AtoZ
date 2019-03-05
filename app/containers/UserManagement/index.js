import React, { Component } from 'react';
import { compose } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { RouteManager } from 'constantsApp';
import UserManagementIndex from './UserManagementIndex'
import UserManagementDetails from './UserManagementDetails'
import reducer from './reducer';
import saga from './saga';


class ArOperations extends Component {
  componentDidMount() {}

  render() {
    
    return (
      <Switch>
        <Route
          exact
          path={`${RouteManager.userManagement.mainRoute}`}
          render={() => <Redirect to={RouteManager.userManagement.roles.route} />}
        />
        <Route
          exact
          path={`${RouteManager.userManagement.mainRoute}/:childRoute`}
          component={UserManagementIndex}
        />
       <Route
          exact
          path={`${RouteManager.userManagement.mainRoute}/:childRoute/:id/detail`}
          component={UserManagementDetails}
        />
         <Route
          exact
          path={`${RouteManager.userManagement.mainRoute}/:childRoute/detail`}
          component={UserManagementDetails}
        />
      </Switch>
    );
  }
}

const withReducer = injectReducer({ key: 'userManagementReducer', reducer });
const withSaga = injectSaga({ key: 'userManagementSaga', saga });

export default compose(
  withReducer,
  withSaga,
)(ArOperations);
