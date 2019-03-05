import React from 'react';
import PropTypes from 'prop-types';
import { SideBar } from 'components/bundlemanagement';
import { RouteManager } from 'constantsApp';
import BMBundles from './BMBundles';
import BMPDependencies from './BMDependencies';
import BMPackges from './BMPackages';

class PricingManager extends React.PureComponent {
  getActiveRoute() {
    const {
      match: {
        params: { childRoute },
      },
    } = this.props;
    switch (childRoute) {
      case RouteManager.bundleManagement.bundle.name:
        return RouteManager.bundleManagement.bundle.route;
      case RouteManager.bundleManagement.dependency.name:
        return RouteManager.bundleManagement.dependency.route;
      case RouteManager.bundleManagement.package.name:
        return RouteManager.bundleManagement.package.route;
      default:
        return '';
    }
  }

  renderContent() {
    const {
      match: {
        params: { childRoute },
      },
    } = this.props;
    switch (childRoute) {
      case 'bundles':
        return <BMBundles />;
      case 'dependencies':
        return <BMPDependencies />;
      case 'packages':
        return <BMPackges />;
      default:
        return <BMBundles />;
    }
  }
  render() {
    return (
      <div className="global-page pricing-page">
        <SideBar routeActive={this.getActiveRoute()} />
        {this.renderContent()}
      </div>
    );
  }
}

PricingManager.propTypes = {
  match: PropTypes.object,
};

export default PricingManager;
