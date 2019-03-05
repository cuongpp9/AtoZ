import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  UnallocationPaymentTable,
  UnallocationPaymentFilter,
} from 'components/payments';
import { PageAbstract } from 'components/commons';
import { paymentSort } from 'constantsApp';
import { makeGetlistPayments, errorMessagePayments } from '../../selectors';
import { searchPayments, allocatePayment } from '../../actions';

class UnallocationPayment extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isActiveNext: true,
      isSearching: false,
      selectedPayment: null,
      page: 1,
      size: 20,
    };
    this.filter = {
      accountId: props.accountId,
      status: props.status,
    };
    this.sort = 'paymentDate_ASC';
  }

  componentDidMount() {
    const { page, size } = this.state;
    this.props.searchPayments({
      page,
      size,
      filter: this.filter,
      sort: this.sort,
      resetList: true,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listPayments !== nextProps.listPayments) {
      const { size } = this.state;

      if (nextProps.listPayments.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  onHandleSearch = filter => {
    // eslint-disable-next-line no-param-reassign
    filter.accountId = this.props.accountId;
    // eslint-disable-next-line no-param-reassign
    filter.status = this.props.status;

    this.setState({ isSearching: true });
    this.props.searchPayments(
      {
        page: 1,
        size: 20,
        filter,
        sort: this.sort,
      },
      () => {
        this.setState({
          isSearching: false,
          page: 1,
          size: 20,
          selectedPayment: null,
        });
      },
    );
    this.filter = filter;
  };

  handlePage = pageOffset => {
    const { page, size } = this.state;

    this.setState({ page: page + pageOffset });
    this.props.searchPayments(
      {
        page: page + pageOffset,
        size,
        filter: this.filter,
        sort: this.sort,
      },
      () => {
        this.setState({ selectedPayment: null });
      },
    );
  };

  handleSize = size => {
    this.setState({ size, page: 1 });
    this.props.searchPayments(
      {
        page: 1,
        size,
        filter: this.filter,
        sort: this.sort,
      },
      () => {
        this.setState({ selectedPayment: null });
      },
    );
  };

  handleSortPayment = (key, value) => {
    this.props.searchPayments(
      {
        page: 1,
        size: 20,
        filter: this.filter,
        sort: paymentSort[key][value],
      },
      () => {
        this.setState({ page: 1, size: 20, selectedPayment: null });
      },
    );
    this.sort = paymentSort[key][value];
  };

  onSelectedPayment = selectedPayment1 => {
    const { selectedPayment } = this.state;
    if (!selectedPayment || selectedPayment.id !== selectedPayment1.id) {
      this.setState({ selectedPayment: selectedPayment1 });
    } else {
      this.setState({ selectedPayment: null });
    }
  };

  // callbackAfterAllocated = () => {
  // const { page, size } = this.state;
  // this.props.searchPayments({
  //   page,
  //   size,
  //   filter: this.filter,
  //   sort: this.sort,
  // });
  // this.setState({ selectedPayment: null });
  // this.props.history.push('/payments/payment-agent/view-payment-activity');
  // };

  render() {
    const { listPayments, errorMessage, accountId } = this.props;
    const { isSearching, selectedPayment, page, size } = this.state;

    return (
      <PageAbstract>
        <div className="form-content">
          <div className="form-header">
            <Row>
              <Col md={12}>
                <h3 className="bold-text">
                  Unallocated Payments
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="account-detail">Account Number:</span>
                  <span className="account-detail">
                    {accountId}
                  </span>&nbsp;&nbsp;
                </h3>
              </Col>
            </Row>
          </div>
          <div className="ml-3">
            <Col md={12}>
              <UnallocationPaymentFilter
                onHandleSearch={this.onHandleSearch}
                isSearching={isSearching}
              />
            </Col>
          </div>
          <Row>
            <UnallocationPaymentTable
              data={listPayments}
              handleSortPayment={this.handleSortPayment}
              page={page}
              size={size}
              handlePage={this.handlePage}
              isActiveNext={this.state.isActiveNext}
              handleSize={this.handleSize}
              errorMessage={errorMessage}
              selectedPayment={selectedPayment}
              onSelectedPayment={this.onSelectedPayment}
              accountId={this.props.accountId}
              // callbackAfterAllocated={this.callbackAfterAllocated}
              allocatePayment={this.props.allocatePayment}
            />
          </Row>
        </div>
      </PageAbstract>
    );
  }
}

UnallocationPayment.propTypes = {
  listPayments: PropTypes.array,
  searchPayments: PropTypes.func,
  errorMessage: PropTypes.string,
  accountId: PropTypes.string,
  status: PropTypes.string,
  allocatePayment: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  listPayments: makeGetlistPayments() || [],
  errorMessage: errorMessagePayments() || '',
});

export default connect(
  mapStateToProps,
  { searchPayments, allocatePayment },
)(UnallocationPayment);
