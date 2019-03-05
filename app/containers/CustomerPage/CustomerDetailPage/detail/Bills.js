import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { TableBillUnits, SearchFilterBill } from 'components/customers';
import BillSort from 'constantsApp/customer/BillUnitsSort';
import {
  makeGetBillUnit,
  makePageBillParams,
  makeErrorMessageBillU,
} from '../../selectors';
import { getBillUnit, setBillParams } from '../../actions';

class Bills extends React.PureComponent {
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

    this.props.getBillUnit({
      page,
      size,
      filter: this.filter,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.billUnit !== nextProps.billUnit) {
      const {
        params: { size },
      } = nextProps;

      if (nextProps.billUnit.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  onHandleSearch = filter => {
    this.setState({ isSearching: true });
    const resultFilter = filter || {};
    resultFilter.accountId = this.props.id;
    this.props.getBillUnit(
      {
        page: 1,
        size: 20,
        filter: resultFilter,
        sort: this.sort,
      },
      () => {
        this.setState({ isSearching: false });
        this.props.setBillParams({ page: 1, size: 20 });
      },
    );
    this.filter = resultFilter;
  };

  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setBillParams({ size, page: page + pageOffset });
    this.props.getBillUnit({
      page: page + pageOffset,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSize = size => {
    this.props.setBillParams({ size, page: 1 });
    this.props.getBillUnit({
      page: 1,
      size,
      filter: this.filter,
      sort: this.sort,
    });
  };

  handleSortBill = (key, value) => {
    this.props.getBillUnit(
      {
        page: 1,
        size: 20,
        filter: this.filter,
        sort: BillSort[key][value],
      },
      () => {
        this.props.setBillParams({ page: 1, size: 20 });
      },
    );
    this.sort = BillSort[key][value];
  };

  render() {
    const {
      billUnit,
      params: { page, size },
      errorMessage,
    } = this.props;
    const { isSearching } = this.state;
    return (
      <div className="account-transaction">
        <Row>
          <Col md={12}>
            <SearchFilterBill
              onHandleSearch={this.onHandleSearch}
              isSearching={isSearching}
            />
          </Col>
        </Row>
        <Row>
          <TableBillUnits
            data={billUnit}
            handleSortBill={this.handleSortBill}
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
Bills.propTypes = {
  billUnit: PropTypes.array,
  getBillUnit: PropTypes.func,
  params: PropTypes.object,
  setBillParams: PropTypes.func,
  errorMessage: PropTypes.string,
  id: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  billUnit: makeGetBillUnit() || [],
  params: makePageBillParams() || {},
  errorMessage: makeErrorMessageBillU() || '',
});

export default connect(
  mapStateToProps,
  {
    getBillUnit,
    setBillParams,
  },
)(Bills);
