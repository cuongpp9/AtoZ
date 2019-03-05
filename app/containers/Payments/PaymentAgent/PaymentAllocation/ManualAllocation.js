import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { ManualAllocationTable } from 'components/payments';
import { PageAbstract } from 'components/commons';
import { invoiceSort } from 'constantsApp';
import { makeGetInvoices, errorMsgInvoices } from '../../selectors';
import { searchInvoices, allocatePayment } from '../../actions';

class ManualAllocation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isActiveNext: true,
      // selectedInvoice: null,
      page: 1,
      size: 20,
    };
    this.filter = {
      accountId: this.getAccountFromQuery(props.location),
      due: 0,
      status: 'ACTIVE',
    };
    this.sort = 'invoiceDate_ASC';
  }

  componentDidMount() {
    const { page, size } = this.state;
    this.props.searchInvoices({
      page,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.invoices !== nextProps.invoices) {
      const { size } = this.state;

      if (nextProps.invoices.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  getAccountFromQuery(location) {
    const { search } = location;
    const account = search.split('&')[0];

    return account.split('=')[1];
  }

  handlePage = pageOffset => {
    const { page, size } = this.state;

    this.setState({ page: page + pageOffset });
    this.props.searchInvoices(
      {
        page: page + pageOffset,
        size,
        filter: this.filter,
        sort: this.sort,
      },
      () => {
        // this.setState({ selectedInvoice: null });
      },
    );
  };

  handleSize = size => {
    this.setState({ size, page: 1 });
    this.props.searchInvoices(
      {
        page: 1,
        size,
        filter: this.filter,
        sort: this.sort,
      },
      () => {
        // this.setState({ selectedInvoice: null });
      },
    );
  };

  handleSortInvoice = (key, value) => {
    this.props.searchInvoices(
      {
        page: 1,
        size: 20,
        filter: this.filter,
        sort: invoiceSort[key][value],
      },
      () => {
        // this.setState({ page: 1, size: 20, selectedInvoice: null });
        this.setState({ page: 1, size: 20 });
      },
    );
    this.sort = invoiceSort[key][value];
  };

  // onSelectedInvoice = selectedInvoice1 => {
  //   const { selectedInvoice } = this.state;
  //   if (!selectedInvoice || selectedInvoice.id !== selectedInvoice1.id) {
  //     this.setState({ selectedInvoice: selectedInvoice1 });
  //   } else {
  //     this.setState({ selectedInvoice: null });
  //   }
  // };

  // callbackAfterAllocated = () => {
  // const { page, size } = this.state;
  // this.props.searchInvoices({
  //   page,
  //   size,
  //   filter: this.filter,
  //   sort: this.sort,
  // });
  // this.setState({ selectedInvoice: null });
  // };

  render() {
    const { location } = this.props;
    const {
      state: { selectedPayment },
    } = location;

    const { invoices, errorMessage } = this.props;
    const { page, size } = this.state;

    return (
      <PageAbstract>
        <div className="form-content">
          <div className="form-header">
            <Row>
              <Col md={12}>
                <h3 className="bold-text">
                  Manual Allocation &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="account-detail">Account Number:</span>
                  <span className="account-detail">
                    {this.getAccountFromQuery(location)}
                  </span>&nbsp;&nbsp;
                </h3>
              </Col>
            </Row>
          </div>
          <div className="mt-3 mb-3">
            <Col md={12}>
              <span className="box-content">Payment Txn Id:</span>
              &nbsp;&nbsp;&nbsp;
              <span className="box-content">{selectedPayment.id}</span>
              <span className="box-content ml-5">Remaining Amount:</span>
              &nbsp;&nbsp;&nbsp;
              <span className="box-content">
                {selectedPayment.remainingAmount}
              </span>
              <span className="box-content ml-5">Payment Date:</span>
              &nbsp;&nbsp;&nbsp;
              <span className="box-content">{selectedPayment.paymentDate}</span>
            </Col>
          </div>
          <Row>
            <ManualAllocationTable
              data={invoices}
              handleSortInvoice={this.handleSortInvoice}
              page={page}
              size={size}
              handlePage={this.handlePage}
              isActiveNext={this.state.isActiveNext}
              handleSize={this.handleSize}
              errorMessage={errorMessage}
              // selectedInvoice={selectedInvoice}
              // onSelectedInvoice={this.onSelectedInvoice}
              allocatePayment={this.props.allocatePayment}
              // callbackAfterAllocated={this.callbackAfterAllocated}
              paymentId={selectedPayment.id}
            />
          </Row>
        </div>
      </PageAbstract>
    );
  }
}

ManualAllocation.propTypes = {
  location: PropTypes.object,
  invoices: PropTypes.array,
  searchInvoices: PropTypes.func,
  errorMessage: PropTypes.string,
  allocatePayment: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  invoices: makeGetInvoices() || [],
  errorMessage: errorMsgInvoices() || '',
});

export default connect(
  mapStateToProps,
  { searchInvoices, allocatePayment },
)(ManualAllocation);
