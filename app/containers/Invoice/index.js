import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';
import InvoiceLayout from './InvoiceLayout';
import saga from './saga';
import reducer from './reducer';

class InvoiceRoute extends Component {
  componentDidMount() {}

  render() {
    return (
      <Switch>
        <Route exact path="/invoices/:id" component={InvoiceLayout} />
      </Switch>
    );
  }
}

const withSaga = injectSaga({ key: 'invoiceRouteSaga', saga });
const withReducer = injectReducer({ key: 'invoiceReducer', reducer });

export default compose(
  withReducer,
  withSaga,
)(InvoiceRoute);
