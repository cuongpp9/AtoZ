import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  TablePaymentSuspense,
  SearchFilterPaymentSuspense,
} from 'components/payments';
// import { getAccountId } from 'asynStorage/accountStorage';
import { PageAbstract } from 'components/commons';
import { paymentSuspenseSort } from 'constantsApp';
import {
  makeGetlistPaymentSuspense,
  makePagePaymentSuspenseParams,
  errorMessagePaymentSuspense,
} from '../../selectors';
import {
  searchPaymentSuspense,
  setParamsPayments,
  applyPaymentSuspense,
  modifyPaymentSuspense,
} from '../../actions';

class PaymentSuspense extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isActiveNext: true,
      isSearching: false,
      selectedPayment: null,
    };
    this.filter = {
      // accountId: getAccountId() || null,
    };
    this.sort = '';
  }
  componentDidMount() {
    // if (!getAccountId()) {
    //   alert('You need to select account first');
    //   this.props.history.push('/payments/payment-agent/search-account');
    //   return;
    // }

    const {
      params: { page, size },
    } = this.props;
    this.props.searchPaymentSuspense({
      page,
      size,
      filter: this.filter,
      resetList: true,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listPaymentSuspense !== nextProps.listPaymentSuspense) {
      const {
        params: { size },
      } = nextProps;

      if (nextProps.listPaymentSuspense.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  onHandleSearch = filter => {
    // eslint-disable-next-line no-param-reassign
    // filter.accountId = getAccountId();
    this.setState({ isSearching: true });
    this.props.searchPaymentSuspense(
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
    this.props.searchPaymentSuspense(
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
    this.props.searchPaymentSuspense(
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
    this.props.searchPaymentSuspense(
      {
        page: 1,
        size: 20,
        filter: this.filter,
        sort: paymentSuspenseSort[key][value],
      },
      () => {
        this.props.setParamsPayments({ page: 1, size: 20 });
        this.setState({ selectedPayment: null });
      },
    );
    this.sort = paymentSuspenseSort[key][value];
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
    this.props.searchPaymentSuspense({
      page,
      size,
      filter: this.filter,
      sort: this.sort,
    });
    this.setState({ selectedPayment });
  };

  applyPaymentSuspense = formData => {
    this.props.applyPaymentSuspense(formData, ({ success, data }) => {
      if (success) {
        this.callbackAfterAction(data);
      }
    });
  };

  modifiedPaymentSuspense = formData => {
    this.props.modifyPaymentSuspense(formData, ({ success, data }) => {
      if (success) {
        this.callbackAfterAction(data);
      }
    });
  };

  render() {
    const {
      listPaymentSuspense,
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
                  Payment Suspense&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </h3>
              </Col>
            </Row>
          </div>
          <div className="ml-3">
            <Col md={12}>
              <SearchFilterPaymentSuspense
                onHandleSearch={this.onHandleSearch}
                isSearching={isSearching}
                // accountId={getAccountId()}
              />
            </Col>
          </div>
          <Row>
            <TablePaymentSuspense
              data={listPaymentSuspense}
              handleSortPayment={this.handleSortPayment}
              page={page}
              size={size}
              handlePage={this.handlePage}
              isActiveNext={this.state.isActiveNext}
              handleSize={this.handleSize}
              errorMessage={errorMessage}
              selectedPayment={selectedPayment}
              onSelectedPayment={this.onSelectedPayment}
              applyPaymentSuspense={this.applyPaymentSuspense}
              modifiedPaymentSuspense={this.modifiedPaymentSuspense}
            />
          </Row>
        </div>
      </PageAbstract>
    );
  }
}

PaymentSuspense.propTypes = {
  // history: PropTypes.object,
  listPaymentSuspense: PropTypes.array,
  params: PropTypes.object,
  setParamsPayments: PropTypes.func,
  searchPaymentSuspense: PropTypes.func,
  applyPaymentSuspense: PropTypes.func,
  errorMessage: PropTypes.string,
  modifyPaymentSuspense: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  listPaymentSuspense: makeGetlistPaymentSuspense() || [],
  params: makePagePaymentSuspenseParams() || {},
  errorMessage: errorMessagePaymentSuspense() || '',
});

export default connect(
  mapStateToProps,
  {
    searchPaymentSuspense,
    setParamsPayments,
    applyPaymentSuspense,
    modifyPaymentSuspense,
  },
)(PaymentSuspense);
