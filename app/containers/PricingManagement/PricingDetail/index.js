import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { PageAbstract } from 'components/commons';
import { SideBar } from 'components/pricingmanagement';
import { RouteManager } from 'constantsApp';
import { ItemEditForm, PriceOfferEditForm } from './components';
import { makeGetPriceOfferDetail } from '../selectors';
import { getItemDetail, getPriceOfferDetail } from '../actions';

class PricingManagerDetail extends Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { childRoute },
      },
    } = props;
    this.state = {
      initRoute: childRoute || 'items',
    };
  }

  getAction(childRoute, id) {
    switch (childRoute) {
      case 'items':
        return this.props.getItemDetail(id);
      case 'price-offers':
        return this.props.getPriceOfferDetail(id);
      default:
        return this.props.getItemDetail(id);
    }
  }

  componentDidMount() {
    const {
      match: {
        params: { id, childRoute },
      },
    } = this.props;
    this.getAction(childRoute, id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match !== nextProps.match) {
      const {
        match: {
          params: { childRoute },
        },
      } = nextProps;
      this.setState({
        initRoute: childRoute,
      });
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

  renderContent() {
    const { initRoute } = this.state;
    const {
      match: {
        params: { id },
      },
    } = this.props;
    switch (initRoute) {
      case 'items':
        return <ItemEditForm idx={id} />;
      case 'price-offers':
        return <PriceOfferEditForm />;
      default:
        return <ItemEditForm idx={id} />;
    }
  }

  render() {
    return (
      <div className="global-page pricing-page">
        <SideBar routeActive={this.getActiveRoute()} />
        <PageAbstract>{this.renderContent()}</PageAbstract>
      </div>
    );
  }
}

PricingManagerDetail.propTypes = {
  match: PropTypes.object,
  getItemDetail: PropTypes.func,
  getPriceOfferDetail: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  priceOfferInfo: makeGetPriceOfferDetail() || {},
});

export default connect(
  mapStateToProps,
  {
    getItemDetail,
    getPriceOfferDetail,
  },
)(PricingManagerDetail);
