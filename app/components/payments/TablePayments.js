import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Select from 'react-select';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { SortType, paymentSelect } from 'constantsApp';
import { DynamicSelectField } from 'components/form';
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
  },
  {
    key: 'status',
    name: 'Status',
    sortName: 'status',
  },
];
class TablePayments extends Component {
  constructor() {
    super();
    this.state = {
      keySort: 'paymentDate',
      valueSort: 'asc',
      notes: '',
      reason: null,
      allocating: false,
    };
  }

  onChangeNotes = evt => {
    this.setState({ notes: evt.target.value });
  };

  onChangeReason = val => {
    this.setState({ reason: val });
  };

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

  onClickReverse = () => {
    const { notes, reason } = this.state;
    if (!notes || !reason) {
      return
    }

    const {
      selectedPayment,
      reversePayment,
      callbackAfterAction,
    } = this.props;

    const payloadRequest = {
      id: selectedPayment.id,
      reversedAmount: selectedPayment.amount,
      reason: reason.value,
      notes,
      userId: 'UserX001', // hard code
    };

    reversePayment(payloadRequest, ({ success, data }) => {
      if (success) {
        this.setState({ notes: '' });
        callbackAfterAction(data);
      }
    });
  };

  onClickAutoAllocate = () => {
    const { selectedPayment, callbackAfterAction, allocatePayment } = this.props;
    const payloadRequest = {
      id: selectedPayment.id,
      userId: 'UserX001',
    }

    this.setState({ allocating: true });
    allocatePayment(payloadRequest, ({ success, data }) => {
      // this.setState({ allocating: false });
      if (success) {
        callbackAfterAction(data);
      } else {
        this.setState({ allocating: false });
      }
    })
  }

  onClickManual = () => {
    const location = {
      pathname: '/payments/payment-agent/payment-allocation',
      search: `?accountId=${this.props.selectedPayment.accountId}&invoiceStatus=ACTIVE`,
      state: { selectedPayment: this.props.selectedPayment },
    };
    this.props.history.push(location);
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
      <td>{row.status}</td>
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
            <td colSpan={7} className="txt-error">
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
            <td colSpan={7}>No record has found!</td>
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
    const { notes, reason } = this.state;
    const enableBtnReverse =
      selectedPayment && ( selectedPayment.status === 'CLOSED' || selectedPayment.status === 'OPEN');
    const enableBtnAllocate =
      selectedPayment && selectedPayment.status === 'OPEN';
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
            </CardBody>
            <div className="mt-3">
              <Row>
                <Col md={6}>
                  <div className="ml-3">
                    <ButtonCustom
                      loading={this.state.allocating}
                      className="btn btn-primary"
                      type="button"
                      title="Auto Allocate"
                      titleloading="Allocating"
                      onClick={this.onClickAutoAllocate}
                      disabled={!enableBtnAllocate}
                    />
                    <Button
                      color="success"
                      className="ml-3"
                      disabled={!enableBtnAllocate}
                      onClick={this.onClickManual}
                    >
                      Manual Allocation
                    </Button>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mr-3">
                    <div className="form__form-group-field form">
                      <textarea
                        type="text"
                        name="notes"
                        value={this.state.notes}
                        placeholder="Notes"
                        onChange={this.onChangeNotes}
                        disabled={!enableBtnReverse}
                        style={enableBtnReverse && !this.state.notes ? styles.styleTextAreaRequired : {}}
                      />
                    </div>
                    <div className="pull-right reversal-payment-field">
                      <div className="form__form-group-field form mt-3">
                        <Select
                          name="reason"
                          options={paymentSelect.paymentReversalReason}
                          placeholder="Payment Reversal Reason"
                          className={`form__form-group-select ${
                            !this.state.reason
                              ? 'active-error'
                                : ''
                          }`}
                          value={this.state.reason}
                          onChange={this.onChangeReason}
                          isDisabled={!enableBtnReverse}
                          required
                          isClearable
                        />
                      </div>
                      <Button
                        color="primary"
                        className="pull-right mt-3"
                        disabled={!enableBtnReverse}
                        onClick={this.onClickReverse}
                      >
                        Reverse Payment
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="table__action ml-3 mr-3">
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
          </div>
        </Card>
      </Col>
    );
  }
}

const styles = {
  styleTextAreaRequired: {
    borderColor: '#ed1c24',
  },
};

TablePayments.propTypes = {
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
  reversePayment: PropTypes.func,
  callbackAfterAction: PropTypes.func,
  allocatePayment: PropTypes.func,
};

export default compose(withRouter)(TablePayments);
