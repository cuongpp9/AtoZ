import React, { Component } from 'react';
import { compose } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { SideBar } from 'components/payments';
import reducer from './reducer';
import saga from './saga';
import PaymentAdmin from './PaymentAdmin';
import PaymentAgent from './PaymentAgent';

import './styles.scss';

class Payments extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="payment-page">
        <SideBar />
        <Switch>
          <Route
            exact
            path="/payments"
            render={() => (
              <Redirect to="/payments/payment-admin/payment-configuration" />
            )}
          />
          <Route
            exact
            path="/payments/payment-admin"
            render={() => (
              <Redirect to="/payments/payment-admin/payment-configuration" />
            )}
          />
          <Route
            exact
            path="/payments/payment-admin/:childRoute"
            component={PaymentAdmin}
          />

          <Route
            exact
            path="/payments/payment-agent"
            render={() => (
              <Redirect to="/payments/payment-agent/search-account" />
            )}
          />
          <Route
            exact
            path="/payments/payment-agent/:childRoute"
            component={PaymentAgent}
          />
        </Switch>
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'paymentsReducer', reducer });
const withSaga = injectSaga({ key: 'paymentsSaga', saga });

export default compose(
  withReducer,
  withSaga,
)(Payments);
