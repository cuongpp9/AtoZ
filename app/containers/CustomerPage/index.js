import React, { Component } from 'react';
import { compose } from 'redux';
import { Switch, Route } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import CustomerIndexPage from './CustomerIndex';
import CustomerCreateAccount from './CustomerCreate';
import CustomerDetailPage from './CustomerDetailPage';
// import CustomerCreate from '../CustomerCreate';
import './styles.scss';

class CustomerPage extends Component {
  componentDidMount() {}

  render() {
    return (
      <Switch>
        <Route exact path="/customers" component={CustomerIndexPage} />
        <Route
          exact
          path="/customers/create/:childRoute"
          component={CustomerCreateAccount}
        />
        <Route
          exact
          path="/customers/:id/:childRoute"
          component={CustomerDetailPage}
        />
      </Switch>
    );
  }
}

const withReducer = injectReducer({ key: 'customerReducer', reducer });
const withSaga = injectSaga({ key: 'customerSaga', saga });

export default compose(
  withReducer,
  withSaga,
)(CustomerPage);
