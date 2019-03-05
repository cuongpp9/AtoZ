import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  TablePriceOffer,
  SearchFilterPriceOffer,
} from 'components/pricingmanagement';
import { PageAbstract } from 'components/commons';
import { RouteManager } from 'constantsApp';
import PriceOfferSort from 'constantsApp/pricingManager/priceOfferSort';
import {
  makeGetListPriceOffers,
  makePagePriceOfferParams,
  makeErrorMessage,
} from '../selectors';
import { searchPriceOffers, setParamsPriceOffers } from '../actions';

class PMPriceOffer extends React.PureComponent {
  constructor() {
    super();
    this.state = { isActiveNext: true, isSearching: false };
    this.filter = {};
    this.sort = '';
  }
  componentDidMount() {
    const {
      params: { page, size },
    } = this.props;
    this.props.searchPriceOffers({
      page,
      size,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listPriceOffers !== nextProps.listPriceOffers) {
      const {
        params: { size },
      } = nextProps;

      if (nextProps.listPriceOffers.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  onHandleSearch = filter => {
    this.setState({ isSearching: true });
    this.props.searchPriceOffers(
      {
        page: 1,
        size: 20,
        filter,
        sort: this.sort,
      },
      () => {
        this.setState({ isSearching: false });
        this.props.setParamsPriceOffers({ page: 1, size: 20 });
      },
    );
    this.filter = filter;
  };

  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setParamsPriceOffers({ size, page: page + pageOffset });
    this.props.searchPriceOffers({
      page: page + pageOffset,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSize = size => {
    this.props.setParamsPriceOffers({ size, page: 1 });
    this.props.searchPriceOffers({
      page: 1,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSortPriceOffers = (key, value) => {
    this.props.searchPriceOffers(
      {
        page: 1,
        size: 20,
        filter: this.filter,
        sort: PriceOfferSort[key][value],
      },
      () => {
        this.props.setParamsPriceOffers({ page: 1, size: 20 });
      },
    );
    this.sort = PriceOfferSort[key][value];
  };

  render() {
    const {
      listPriceOffers,
      params: { page, size },
      errorMessage,
    } = this.props;
    const { isSearching } = this.state;
    return (
      <PageAbstract>
        <Row>
          <Col md={12}>
            <Link
              to={RouteManager.pricingManagement.priceOffer.create}
              className="btn btn-success btn-create"
            >
              <i className="fa fa-plus" />&nbsp; Create New Price Offer
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h3 className="bold-text">Price Offers</h3>
            <SearchFilterPriceOffer
              onHandleSearch={this.onHandleSearch}
              isSearching={isSearching}
            />
          </Col>
        </Row>
        <Row>
          <TablePriceOffer
            data={listPriceOffers}
            handleSortPriceOffers={this.handleSortPriceOffers}
            page={page}
            size={size}
            handlePage={this.handlePage}
            isActiveNext={this.state.isActiveNext}
            handleSize={this.handleSize}
            errorMessage={errorMessage}
          />
        </Row>
      </PageAbstract>
    );
  }
}

PMPriceOffer.propTypes = {
  params: PropTypes.object,
  setParamsPriceOffers: PropTypes.func,
  listPriceOffers: PropTypes.array,
  searchPriceOffers: PropTypes.func,
  errorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  listPriceOffers: makeGetListPriceOffers() || [],
  params: makePagePriceOfferParams() || {},
  errorMessage: makeErrorMessage() || '',
});

export default connect(
  mapStateToProps,
  { searchPriceOffers, setParamsPriceOffers },
)(PMPriceOffer);
