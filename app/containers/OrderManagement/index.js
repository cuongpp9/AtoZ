import React, { Component } from 'react';
import { compose } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import OrderIndex from './OrderIndex';
import OrderDetail from './OrderDetail';
import OrderCreate from './OrderCreate';
import OrderModify from './OrderModify';
import OrderCreateDifferent from './OrderCreateDifferent';
class OrderManagement extends Component {
  componentDidMount() {}

  render() {
    return (
      <Switch>
        <Route exact path="/orders/search-list" component={OrderIndex} />
        <Route
          exact
          path="/orders"
          render={() => <Redirect to="/orders/search-list" />}
        />
        <Route exact path="/orders/new" component={OrderCreate} />
        <Route exact path="/orders/modify" component={OrderModify} />
        <Route
          exact
          path="/orders/:childRoute"
          component={OrderCreateDifferent}
        />
        <Route exact path="/orders/:id/detail" component={OrderDetail} />
      </Switch>
    );
  }
}

const withReducer = injectReducer({ key: 'orderReducer', reducer });
const withSaga = injectSaga({ key: 'orderSaga', saga });

export default compose(
  withReducer,
  withSaga,
)(OrderManagement);
