import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { SortType } from 'constantsApp';
import { Pagination, Sizing, HeaderTableSort, ButtonCustom } from '../commons';

const heads = [
  {
    key: 'accountId',
    name: 'Act No',
    sortName: 'accountId',
  },
  {
    key: 'amount',
    name: 'Payment Amount',
  },
  {
    key: 'remainingAmount',
    name: 'Remaining Amount',
  },
  {
    key: 'invoiceUnitId',
    name: 'Invoice id',
    sortName: 'invoiceUnitId',
  },
  {
    key: 'paymentDate',
    name: 'Payment Date',
    sortName: 'paymentDate',
  },
  {
    key: 'paymentId',
    name: 'Payment Txn Id',
    sortName: 'id',
  },
];

class UnallocationPaymentTable extends Component {
  constructor() {
    super();
    this.state = {
      keySort: 'paymentDate',
      valueSort: 'asc',
      allocating: false,
    };
  }

  handleSort = sortName => {
    let { keySort, valueSort } = this.state;
    if (!keySort || keySort !== sortName) {
      keySort = sortName;
      valueSort = SortType.asc;
    } else {
      valueSort = valueSort === SortType.asc ? SortType.desc : SortType.asc;
    }
    this.setState({ keySort, valueSort });
    this.props.handleSortPayment(keySort, valueSort);
  };

  onClickManual = () => {
    const location = {
      pathname: '/payments/payment-agent/payment-allocation',
      search: `?accountId=${this.props.accountId}&invoiceStatus=OPEN`,
      state: { selectedPayment: this.props.selectedPayment },
    };
    this.props.history.push(location);
  }

  onClickAutoAllocate = () => {
    const { selectedPayment } = this.props;
    const data = {
      id: selectedPayment.id,
      userId: 'UserX001',
    }

    this.setState({ allocating: true });
    this.props.allocatePayment(data, ({ success }) => {
      // this.setState({ allocating: false });
      if (success) {
        // this.props.callbackAfterAllocated()
        this.props.history.push('/payments/payment-agent/view-payment-activity');
      } else {
        this.setState({ allocating: false });
      }
    })
  }

  handleClickRow = payment => {
    this.props.onSelectedPayment(payment);
  };

  renderRow = (row, id) => (
    <tr
      key={id}
      onClick={() => this.handleClickRow(row)}
      className={
        this.props.selectedPayment && this.props.selectedPayment.id === row.id
          ? 'column_active'
          : ''
      }
    >
      <td>{row.accountId}</td>
      <td>{row.amount}</td>
      <td>{row.remainingAmount}</td>
      <td>{row.invoiceUnitId}</td>
      <td>{row.paymentDate}</td>
      <td>{row.id}</td>
    </tr>
  );

  renderHeader = header => {
    const { keySort, valueSort } = this.state;
    if (header.sortName) {
      return (
        <HeaderTableSort
          key={header.key}
          headerName={header.name}
          sortName={header.sortName}
          keySort={keySort}
          valueSort={valueSort}
          handleSort={this.handleSort}
          className="sortable w-25 p-2"
        />
      );
    }

    return (
      <th key={header.key} scope="col" className="w-25 p-2">
        {header.name}
      </th>
    );
  };

  renderBody() {
    const { data, errorMessage } = this.props;

    if (errorMessage) {
      return (
        <tbody>
          <tr>
            <td colSpan={6} className="txt-error">
              {errorMessage}
            </td>
          </tr>
        </tbody>
      );
    }

    if (!data || !data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={6}>No record has found!</td>
          </tr>
        </tbody>
      );
    }
    return <tbody>{data.map(this.renderRow)}</tbody>;
  }

  render() {
    const {
      handlePage,
      page,
      isActiveNext,
      handleSize,
      size,
      selectedPayment,
    } = this.props;
    const enableManualBtn = selectedPayment && selectedPayment.id;

    return (
      <Col md={12} lg={12}>
        <Card>
          <div className="table-block">
            <CardBody>
              <table
                className="table table-hover table-bordered"
                style={{
                  borderTop: '4px solid rgb(132, 170, 79)',
                }}
              >
                <thead>
                  <tr>{heads.map(item => this.renderHeader(item))}</tr>
                </thead>
                {this.renderBody()}
              </table>
              <div className="mt-3">
                <ButtonCustom
                  loading={this.state.allocating}
                  className="btn btn-primary"
                  type="button"
                  title="Auto Allocate"
                  titleloading="Allocating"
                  onClick={this.onClickAutoAllocate}
                  disabled={!enableManualBtn}
                />
                <Button
                  color="success"
                  onClick={this.onClickManual}
                  disabled={!enableManualBtn}
                >
                  Manual Allocation
                </Button>
              </div>
              <div className="table__action mt-3">
              <Row>
                <Col md={6}>
                  <Pagination
                    page={page}
                    isActivePre={page !== 1}
                    isActiveNext={isActiveNext}
                    handlePage={handlePage} // implement handle page here
                  />
                </Col>
                <Col md={6}>
                  <Sizing handleSize={handleSize} size={size} />
                </Col>
              </Row>
            </div>
            </CardBody>
            
          </div>
        </Card>
      </Col>
    );
  }
}

UnallocationPaymentTable.propTypes = {
  data: PropTypes.array,
  handleSortPayment: PropTypes.func,
  handlePage: PropTypes.func,
  page: PropTypes.number,
  isActiveNext: PropTypes.bool,
  handleSize: PropTypes.func,
  size: PropTypes.number,
  history: PropTypes.object,
  errorMessage: PropTypes.string,
  selectedPayment: PropTypes.object,
  onSelectedPayment: PropTypes.func,
  accountId: PropTypes.string,
  // callbackAfterAllocated: PropTypes.func,
  history: PropTypes.object,
  allocatePayment: PropTypes.func,
};

export default compose(withRouter)(UnallocationPaymentTable);
