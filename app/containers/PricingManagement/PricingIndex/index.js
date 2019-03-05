import React from 'react';
import PropTypes from 'prop-types';
import { SideBar } from 'components/pricingmanagement';
import { RouteManager } from 'constantsApp';
import PMItem from './PMItem';
import PMPriceOffer from './PMPriceOffer';

class PricingManager extends React.PureComponent {
  getActiveRoute() {
    const {
      match: {
        params: { childRoute },
      },
    } = this.props;
    switch (childRoute) {
      case RouteManager.pricingManagement.item.name:
        return RouteManager.pricingManagement.item.route;
      case RouteManager.pricingManagement.priceOffer.name:
        return RouteManager.pricingManagement.priceOffer.route;
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
      case 'items':
        return <PMItem />;
      case 'price-offers':
        return <PMPriceOffer />;
      default:
        return <PMItem />;
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
