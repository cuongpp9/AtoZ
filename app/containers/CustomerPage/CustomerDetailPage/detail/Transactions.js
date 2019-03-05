import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  TableTransactionUnits,
  SearchFilterTransaction,
} from 'components/customers';
import TransactionSort from 'constantsApp/customer/TransactionUnitsSort';
import {
  makeGetTransactionUnit,
  makePageTransactionParams,
  makeErrorMessageTU,
} from '../../selectors';
import { getTransactionUnit, setTransactionParams } from '../../actions';

class Transactions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isActiveNext: true, isSearching: false };
    this.filter = { accountId: props.id };
    this.sort = '';
  }
  componentDidMount() {
    const {
      params: { page, size },
    } = this.props;

    this.props.getTransactionUnit({
      page,
      size,
      filter: this.filter,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.transactionUnit !== nextProps.transactionUnit) {
      const {
        params: { size },
      } = nextProps;

      if (nextProps.transactionUnit.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  onHandleSearch = filter => {
    const resultFilter = filter || {};
    resultFilter.accountId = this.props.id;
    this.setState({ isSearching: true });
    this.props.getTransactionUnit(
      {
        page: 1,
        size: 20,
        filter: resultFilter,
        sort: this.sort,
      },
      () => {
        this.setState({ isSearching: false });
        this.props.setTransactionParams({ page: 1, size: 20 });
      },
    );
    this.filter = resultFilter;
  };

  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setTransactionParams({ size, page: page + pageOffset });
    this.props.getTransactionUnit({
      page: page + pageOffset,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSize = size => {
    this.props.setTransactionParams({ size, page: 1 });
    this.props.getTransactionUnit({
      page: 1,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSortTransaction = (key, value) => {
    this.props.getTransactionUnit(
      {
        page: 1,
        size: 20,
        filter: this.filter,
        sort: TransactionSort[key][value],
      },
      () => {
        this.props.setTransactionParams({ page: 1, size: 20 });
      },
    );
    this.sort = TransactionSort[key][value];
  };

  render() {
    const {
      transactionUnit,
      params: { page, size },
      errorMessage,
    } = this.props;
    const { isSearching } = this.state;
    return (
      <div className="account-transaction">
        <Row>
          <Col md={12}>
            <SearchFilterTransaction
              onHandleSearch={this.onHandleSearch}
              isSearching={isSearching}
            />
          </Col>
        </Row>
        <Row>
          <TableTransactionUnits
            data={transactionUnit}
            handleSortTransaction={this.handleSortTransaction}
            page={page}
            size={size}
            handlePage={this.handlePage}
            isActiveNext={this.state.isActiveNext}
            handleSize={this.handleSize}
            errorMessage={errorMessage}
          />
        </Row>
      </div>
    );
  }
}
Transactions.propTypes = {
  transactionUnit: PropTypes.array,
  getTransactionUnit: PropTypes.func,
  params: PropTypes.object,
  setTransactionParams: PropTypes.func,
  errorMessage: PropTypes.string,
  id: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  transactionUnit: makeGetTransactionUnit() || [],
  params: makePageTransactionParams() || {},
  errorMessage: makeErrorMessageTU() || '',
});

export default connect(
  mapStateToProps,
  {
    getTransactionUnit,
    setTransactionParams,
  },
)(Transactions);
