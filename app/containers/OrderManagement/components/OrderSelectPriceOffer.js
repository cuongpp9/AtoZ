import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SearchFilterPriceOffer } from 'components/pricingmanagement';
import { TableSelectPriceOffer } from 'components/orders';
import { calculateValCallback } from 'utils/utils';
import { selectPriceOfferId } from 'containers/App/actions';

class OrderSelectPriceOffer extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isSearching: false,
      priceOffers: [],
      page: 1,
      size: 20,
    };
    this.filter = {};
  }
  componentDidMount() {
    this.props.selectPriceOfferId(
      {
        page: 1,
        size: 20,
      },
      data => {
        const priceOffers = calculateValCallback(data);
        this.setState({ priceOffers });
      },
    );
  }

  onHandleSearch = filter => {
    this.setState({ isSearching: true });
    this.props.selectPriceOfferId(
      {
        page: 1,
        size: 20,
        filter,
      },
      data => {
        const priceOffers = calculateValCallback(data);
        this.setState({
          isSearching: false,
          page: 1,
          size: 20,
          priceOffers,
        });
      },
    );
    this.filter = filter;
  };

  handlePage = pageOffset => {
    const { page, size } = this.state;

    this.setState({ page: page + pageOffset });
    this.props.selectPriceOfferId(
      {
        page: page + pageOffset,
        size,
        filter: this.filter,
      },
      data => {
        const priceOffers = calculateValCallback(data);
        this.setState({ priceOffers });
      },
    );
  };

  handleSize = size => {
    this.setState({ size, page: 1 });
    this.props.selectPriceOfferId(
      {
        page: 1,
        size,
        filter: this.filter,
      },
      data => {
        const priceOffers = calculateValCallback(data);
        this.setState({ priceOffers });
      },
    );
  };

  render() {
    const { isSearching, page, size, priceOffers } = this.state;
    const { poSelected, updatePriceOffer } = this.props;
    return (
      <div className="global-page order-select-package">
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
          <TableSelectPriceOffer
            data={priceOffers}
            page={page}
            size={size}
            handlePage={this.handlePage}
            handleSize={this.handleSize}
            poSelected={poSelected}
            updatePriceOffer={updatePriceOffer}
          />
        </Row>
      </div>
    );
  }
}
OrderSelectPriceOffer.propTypes = {
  selectPriceOfferId: PropTypes.func,
  poSelected: PropTypes.array,
  updatePriceOffer: PropTypes.func,
};

export default connect(
  null,
  {
    selectPriceOfferId,
  },
)(OrderSelectPriceOffer);
