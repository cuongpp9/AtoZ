import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { PageAbstract } from 'components/commons';
import { TableBillUnits } from 'components/collections';
import { invoiceInCollectionSort } from 'constantsApp';
import {
  searchInvoiceInCollection,
  setParamsInvoiceInCollection,
  // createCollectionUnit,
  modifyCollectionUnit,
} from '../actions';
import {
  makeGetListInvoiceUnits,
  makeInvoiceUnitsParams,
  errorMessageInvoiceUnits,
} from '../selectors';

class BillUnits extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.filter = {
      // userId: 'UserX001',
      accountId: this.getAccountId(props.location),
    };
    this.sort = '';
  }

  componentDidMount() {
    const {
      params: { page, size },
    } = this.props;

    this.props.searchInvoiceInCollection({
      page,
      size,
      filter: this.filter,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.invoiceUnits !== nextProps.invoiceUnits) {
      const {
        params: { size },
      } = nextProps;

      if (nextProps.invoiceUnits.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setParamsInvoiceInCollection({ size, page: page + pageOffset });
    this.props.searchInvoiceInCollection({
      page: page + pageOffset,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSize = size => {
    this.props.setParamsInvoiceInCollection({ size, page: 1 });
    this.props.searchInvoiceInCollection({
      page: 1,
      size,
      filter: this.filter,
    });
  };

  handleSort = (key, value) => {
    this.props.searchInvoiceInCollection(
      {
        page: 1,
        size: 20,
        filter: this.filter,
        sort: invoiceInCollectionSort[key][value],
      },
      () => {
        this.props.setParamsInvoiceInCollection({ page: 1, size: 20 });
      },
    );
    this.sort = invoiceInCollectionSort[key][value];
  };

  getAccountId(location) {
    const { search } = location;
    return search.split('=')[1];
  }

  callbackWhenApply = () => {
    const {
      params: { page, size },
    } = this.props;
    this.props.searchInvoiceInCollection({
      page,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  render() {
    const {
      errorMessage,
      invoiceUnits,
      params: { page, size },
      location,
    } = this.props;
    const accountId = this.getAccountId(location);
    return (
      <div className="global-page customer-page">
        <PageAbstract>
          <div className="form-accounts-in-collection">
            <div className="form-header">
              <Row>
                <Col md={12}>
                  <h3 className="bold-text">
                    Invoice Units in Collection
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="account-detail">Account Number:</span>
                    <span className="account-detail">
                      {accountId}
                    </span>&nbsp;&nbsp;
                  </h3>
                </Col>
              </Row>
            </div>
            <Row>
              <TableBillUnits
                data={invoiceUnits}
                errorMessage={errorMessage}
                page={page}
                size={size}
                handlePage={this.handlePage}
                handleSort={this.handleSort}
                isActiveNext={this.state.isActiveNext}
                handleSize={this.handleSize}
                modifyCollectionUnit={this.props.modifyCollectionUnit}
                callbackWhenApply={this.callbackWhenApply}
                // accountId={accountId}
                // userId="UserX001"
              />
            </Row>
          </div>
        </PageAbstract>
      </div>
    );
  }
}

BillUnits.propTypes = {
  searchInvoiceInCollection: PropTypes.func,
  setParamsInvoiceInCollection: PropTypes.func,
  params: PropTypes.object,
  invoiceUnits: PropTypes.array,
  errorMessage: PropTypes.string,
  modifyCollectionUnit: PropTypes.func,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  invoiceUnits: makeGetListInvoiceUnits() || [],
  params: makeInvoiceUnitsParams() || {},
  errorMessage: errorMessageInvoiceUnits() || '',
});

export default connect(
  mapStateToProps,
  {
    searchInvoiceInCollection,
    setParamsInvoiceInCollection,
    modifyCollectionUnit,
  },
)(withRouter(BillUnits));
