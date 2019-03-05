import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Table, Filter, SideBar } from 'components/orders';
import { PageAbstract } from 'components/commons';
import OrderSort from 'constantsApp/order/orderSort';
import {
  makeGetListOrders,
  makePageOrderParams,
  makeErrorMessage,
} from '../selectors';
import { searchOrders, setParams } from '../actions';

class OrderPage extends React.PureComponent {
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

    this.props.searchOrders({
      page,
      size,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listOrders !== nextProps.listOrders) {
      const {
        params: { size },
      } = nextProps;

      if (nextProps.listOrders.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  onHandleSearch = filter => {
    this.setState({ isSearching: true });
    this.props.searchOrders(
      {
        page: 1,
        size: 5,
        filter,
        sort: this.sort,
      },
      () => {
        this.setState({ isSearching: false });
      },
    );
    this.filter = filter;
  };

  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setParams({ size, page: page + pageOffset });
    this.props.searchOrders({
      page: page + pageOffset,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSize = size => {
    this.props.setParams({ size, page: 1 });
    this.props.searchOrders({
      page: 1,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSortOrders = (key, value) => {
    this.props.searchOrders({
      page: 1,
      size: 5,
      filter: this.filter,
      sort: OrderSort[key][value],
    });
    this.sort = OrderSort[key][value];
  };

  render() {
    const {
      listOrders,
      errorMessage,
      params: { page, size },
    } = this.props;
    const { isSearching } = this.state;
    return (
      <div className="global-page order-page">
        <SideBar isShowSidebarItem={false} />
        <PageAbstract>
          <Row>
            <Col md={12}>
              <Link to="/orders/new" className="btn btn-success btn-create">
                <i className="fa fa-plus" />&nbsp; Create a new order
              </Link>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h3 className="bold-text">Orders</h3>
              <Filter
                onHandleSearch={this.onHandleSearch}
                isSearching={isSearching}
              />
            </Col>
          </Row>
          <Row>
            <Table
              data={listOrders}
              handleSortOrders={this.handleSortOrders}
              page={page}
              size={size}
              handlePage={this.handlePage}
              isActiveNext={this.state.isActiveNext}
              handleSize={this.handleSize}
              errorMessage={errorMessage}
            />
          </Row>
        </PageAbstract>
      </div>
    );
  }
}
OrderPage.propTypes = {
  listOrders: PropTypes.array,
  searchOrders: PropTypes.func,
  params: PropTypes.object,
  setParams: PropTypes.func,
  errorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  listOrders: makeGetListOrders() || [],
  params: makePageOrderParams() || {},
  errorMessage: makeErrorMessage() || {},
});

export default connect(
  mapStateToProps,
  {
    searchOrders,
    setParams,
  },
)(OrderPage);
