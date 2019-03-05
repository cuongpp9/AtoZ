import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { TablePayments, SearchFilterPayments } from 'components/payments';
import { PageAbstract } from 'components/commons';
import { paymentSort } from 'constantsApp';
import { getAccountId } from 'asynStorage/accountStorage';
import {
  makeGetlistPayments,
  makePagePaymentsParams,
  errorMessagePayments,
} from '../../selectors';
import {
  searchPayments,
  setParamsPayments,
  reversePayment,
  allocatePayment,
} from '../../actions';

class ViewPaymentActivity extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isActiveNext: true,
      isSearching: false,
      selectedPayment: null,
    };
    this.filter = {
      accountId: getAccountId() || null,
    };
    this.sort = 'paymentDate_ASC';
  }
  componentDidMount() {
    if (!getAccountId()) {
      alert('You need to select account first');
      this.props.history.push('/payments/payment-agent/search-account');
      return;
    }

    const {
      params: { page, size },
    } = this.props;
    this.props.searchPayments({
      page,
      size,
      sort: this.sort,
      filter: this.filter,
      resetList: true,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listPayments !== nextProps.listPayments) {
      const {
        params: { size },
      } = nextProps;

      if (nextProps.listPayments.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  onHandleSearch = filter => {
    this.setState({ isSearching: true });
    // eslint-disable-next-line no-param-reassign
    filter.accountId = getAccountId();
    this.props.searchPayments(
      {
        page: 1,
        size: 20,
        filter,
        sort: this.sort,
      },
      () => {
        this.setState({ isSearching: false, selectedPayment: null });
        this.props.setParamsPayments({ page: 1, size: 20 });
      },
    );
    this.filter = filter;
  };

  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setParamsPayments({ size, page: page + pageOffset });
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
    this.props.setParamsPayments({ size, page: 1 });
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
        this.props.setParamsPayments({ page: 1, size: 20 });
        this.setState({ selectedPayment: null });
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

  callbackAfterAction = selectedPayment => {
    const {
      params: { page, size },
    } = this.props;
    this.props.searchPayments({
      page,
      size,
      filter: this.filter,
      sort: this.sort,
    });
    this.setState({ selectedPayment });
  };

  render() {
    const {
      listPayments,
      params: { page, size },
      errorMessage,
    } = this.props;
    const { isSearching, selectedPayment } = this.state;

    return (
      <PageAbstract>
        <div className="form-content">
          <div className="form-header">
            <Row>
              <Col md={12}>
                <h3 className="bold-text">
                  Payment History&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="account-detail">Account Number:</span>
                  <span className="account-detail">
                    {getAccountId()}
                  </span>&nbsp;&nbsp;
                </h3>
              </Col>
            </Row>
          </div>
          <div className="ml-3">
            <Col md={12}>
              <SearchFilterPayments
                onHandleSearch={this.onHandleSearch}
                isSearching={isSearching}
              />
            </Col>
          </div>
          <Row>
            <TablePayments
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
              reversePayment={this.props.reversePayment}
              callbackAfterAction={this.callbackAfterAction}
              allocatePayment={this.props.allocatePayment}
            />
          </Row>
        </div>
      </PageAbstract>
    );
  }
}

ViewPaymentActivity.propTypes = {
  history: PropTypes.object,
  listPayments: PropTypes.array,
  params: PropTypes.object,
  setParamsPayments: PropTypes.func,
  searchPayments: PropTypes.func,
  errorMessage: PropTypes.string,
  reversePayment: PropTypes.func,
  allocatePayment: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  listPayments: makeGetlistPayments() || [],
  params: makePagePaymentsParams() || {},
  errorMessage: errorMessagePayments() || '',
});
export default connect(
  mapStateToProps,
  { searchPayments, setParamsPayments, reversePayment, allocatePayment },
)(ViewPaymentActivity);
