import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import Header from 'containers/Header';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import CustomerPage from 'containers/CustomerPage';
import PricingManagement from 'containers/PricingManagement';
import OrderManagement from 'containers/OrderManagement';
import BundleManagement from 'containers/BundleManagement';
import ArOperations from 'containers/ArOperations';
import Collections from 'containers/Collections';
import Notification from 'containers/Notification';
import Payments from 'containers/Payments';
import TopBar from 'components/TopBar';
import Invoice from 'containers/Invoice';
import UserManagement from 'containers/UserManagement';
import { RouteManager } from 'constantsApp';
import NotFoundPage from '../NotFoundPage';
import LoginPage from '../LoginPage';
import Loader from '../Loader';
import saga from './saga';
import reducer from './reducer';
import './styles.scss';
import './ico.scss';

function App() {
  return (
    <div className="container-full">
      <Helmet titleTemplate="Congero Cloud" defaultTitle="Congero Cloud">
        <meta name="description" content="congero cloud application" />
      </Helmet>
      <Notification />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={wrapperRoutes} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>
  );
}
const withReducer = injectReducer({ key: 'appReducer', reducer });
const withSaga = injectSaga({ key: 'appSaga', saga });

export default compose(
  withReducer,
  withSaga,
)(App);
const wrapperRoutes = () => (
  <div className="content-container theme-light">
    <Loader />
    <Header />
    <TopBar />
    <div className="container__wrap">
      <Route path="/customers" component={CustomerPage} />
      <Route path="/pricing-management" component={PricingManagement} />
      <Route path="/orders" component={OrderManagement} />
      <Route path="/payments" component={Payments} />
      <Route path="/bundle-management" component={BundleManagement} />
      <Route path="/invoices" component={Invoice} />
      <Route
        path={RouteManager.arOperations.mainRoute}
        component={ArOperations}
      />
      <Route path="/collections" component={Collections} />
      <Route
        path={RouteManager.userManagement.mainRoute}
        component={UserManagement}
      />
    </div>
  </div>
);
