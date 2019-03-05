import React, { Component } from 'react';
import { compose } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { RouteManager } from 'constantsApp';
import reducer from './reducer';
import saga from './saga';

import PricingIndex from './PricingIndex';
import PricingDetail from './PricingDetail';
import PricingCreate from './PricingCreate';

class PrincingManagement extends Component {
  componentDidMount() {
    console.log('componentDidMount');
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path={`/${RouteManager.pricingManagement.name}/:childRoute`}
          component={PricingIndex}
        />
        <Route
          exact
          path={RouteManager.pricingManagement.mainRoute}
          render={() => <Redirect to={RouteManager.pricingManagement.item.route} />}
        />
        <Route
          exact
          path={`/${RouteManager.pricingManagement.name}/:childRoute/:id/detail`}
          component={PricingDetail}
        />
        <Route
          exact
          path={`/${RouteManager.pricingManagement.name}/:childRoute/create`}
          component={PricingCreate}
        />
        <Route
          exact
          path={`/${RouteManager.pricingManagement.name}/:childRoute/:id`}
          render={({ match }) => (
            <Redirect
              to={`/${RouteManager.pricingManagement.name}/${match.params.childRoute}/${
                match.params.id
              }/detail`}
            />
          )}
        />
      </Switch>
    );
  }
}

const withReducer = injectReducer({ key: 'pricingReducer', reducer });
const withSaga = injectSaga({ key: 'pricingSaga', saga });

export default compose(
  withReducer,
  withSaga,
)(PrincingManagement);
