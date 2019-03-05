import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { roundFloat } from 'utils/utils';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { SortType } from 'constantsApp';
import { Pagination, Sizing, HeaderTableSort, ButtonCustom } from '../commons';

const heads = [
  {
    key: 'invoiceId',
    name: 'Invoice Id',
    sortName: 'id',
  },
  {
    key: 'invoiceDate',
    name: 'Invoice Date',
    sortName: 'invoiceDate',
  },
  {
    key: 'dueDate',
    name: 'Due Date',
    sortName: 'dueDate',
  },
  {
    key: 'invoiceAmount',
    name: 'Invoice Amount',
  },
  {
    key: 'dueAmount',
    name: 'Due Amount',
  },
  {
    key: 'applyAmount',
    name: 'Apply Amount',
  },
];

const styleTd = {
  verticalAlign: 'middle',
};

class ManualAllocationTable extends Component {
  constructor() {
    super();
    this.state = {
      keySort: 'invoiceDate',
      valueSort: 'asc',
      allocating: false,
      enableAllocation: false,
    };
    this.allocateData = [];
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data && nextProps.data) {
      this.setState({ enableAllocation: false });
      this.allocateData = [];
    }
  }

  onChangeAmount = (evt, invoiceUnitId) => {
    if (!evt.target.value) {
      this.allocateData = this.allocateData.filter(
        el => el.invoiceUnitId !== invoiceUnitId,
      );
      this.setState({ enableAllocation: !!this.allocateData.length });
    } else {
      const result = this.allocateData.find(
        el => el.invoiceUnitId === invoiceUnitId,
      );

      if (result) {
        result.amount = evt.target.value;
      } else {
        this.allocateData.push({ invoiceUnitId, amount: evt.target.value });
        this.setState({ enableAllocation: true });
      }
    }
  };

  onBlurRoundAmount = (evt, invoiceUnitId) => {
    if (evt.target.value) {
      const result = this.allocateData.find(
        el => el.invoiceUnitId === invoiceUnitId,
      );
      result.amount = roundFloat(evt.target.value, 2);
    }
    // console.log('onBlurRoundAmount', this.allocateData);
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
    this.props.handleSortInvoice(keySort, valueSort);
  };

  // handleClickRow = invoice => {
  //   this.props.onSelectedInvoice(invoice);
  // };

  onClickAllocate = () => {
    const { paymentId } = this.props;
    const data = {
      id: paymentId,
      userId: 'UserX001',
      allocationData: this.allocateData.length ? this.allocateData : null,
    };

    this.setState({ allocating: true });
    this.props.allocatePayment(data, ({ success }) => {
      // this.setState({ allocating: false });
      if (success) {
        // this.props.callbackAfterAllocated();
        this.props.history.push(
          '/payments/payment-agent/view-payment-activity',
        );
      } else {
        this.setState({ allocating: false });
      }
    });
  };

  renderRow = (row, id) => (
    <tr
      key={id}
      // onClick={() => this.handleClickRow(row)}
      // className={
      //   this.props.selectedInvoice && this.props.selectedInvoice.id === row.id
      //     ? 'column_active'
      //     : ''
      // }
    >
      <td style={styleTd}>{row.id}</td>
      <td style={styleTd}>{row.invoiceDate}</td>
      <td style={styleTd}>{row.dueDate}</td>
      <td style={styleTd}>{row.total}</td>
      <td style={styleTd}>{row.due}</td>
      <td style={{ minWidth: 150 }}>
        <div className="form">
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            onChange={evt => this.onChangeAmount(evt, row.id)}
            onBlur={evt => this.onBlurRoundAmount(evt, row.id)}
            disabled={!row.due}
          />
        </div>
      </td>
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
    const { handlePage, page, isActiveNext, handleSize, size } = this.props;
    const { enableAllocation } = this.state;
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
            <div className="mt-3 pull-right mb-3 mr-3">
              <ButtonCustom
                loading={this.state.allocating}
                className="btn btn-primary"
                type="button"
                title="Allocate"
                titleloading="Allocating"
                onClick={this.onClickAllocate}
                disabled={!enableAllocation}
              />
            </div>
            <div className="table__action pl-3 pr-3" style={{ clear: 'right' }}>
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

ManualAllocationTable.propTypes = {
  data: PropTypes.array,
  handleSortInvoice: PropTypes.func,
  handlePage: PropTypes.func,
  page: PropTypes.number,
  isActiveNext: PropTypes.bool,
  handleSize: PropTypes.func,
  size: PropTypes.number,
  // history: PropTypes.object,
  errorMessage: PropTypes.string,
  // selectedInvoice: PropTypes.object,
  // onSelectedInvoice: PropTypes.func,
  allocatePayment: PropTypes.func,
  // callbackAfterAllocated: PropTypes.func,
  paymentId: PropTypes.string,
  history: PropTypes.object,
};

export default compose(withRouter)(ManualAllocationTable);
