import React from 'react';
import PropTypes from 'prop-types';
import { PageAbstract } from 'components/commons';
import { SideBar } from 'components/pricingmanagement';
import { RouteManager } from 'constantsApp';
import PricingItemsCreate from './CreateItem';
import PricingPriceOfferCreate from './CreatePriceOffer';

class CreatePricing extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { childRoute },
      },
    } = props;
    this.state = {
      initRoute: childRoute || 'item',
      titlePage: 'Create New Item',
    };
  }
  componentDidMount() {
    this.setInfo(this.state.initRoute);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match !== nextProps.match) {
      const {
        match: {
          params: { childRoute },
        },
      } = nextProps;
      this.setInfo(childRoute);
    }
  }

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

  setInfo(childRoute) {
    switch (childRoute) {
      case 'price-offer':
        this.setState({
          titlePage: 'Creare New Price Offer',
        });
        break;
      default:
        this.setState({
          titlePage: 'Create New Item',
        });
    }
  }

  renderForm() {
    const { initRoute } = this.state;
    switch (initRoute) {
      case 'item':
        return <PricingItemsCreate />;
      case 'price-offer':
        return <PricingPriceOfferCreate />;
      default:
        return <PricingItemsCreate />;
    }
  }

  render() {
    const { titlePage } = this.state;
    return (
      <div className="global-page pricing-page">
        <SideBar routeActive={this.getActiveRoute()} />
        <PageAbstract title={titlePage}>{this.renderForm()}</PageAbstract>
      </div>
    );
  }
}
CreatePricing.propTypes = {
  match: PropTypes.object,
};

export default CreatePricing;
