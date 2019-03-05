import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { SortType, arOpsEnum } from 'constantsApp';
import { strTwoFractionDigits } from 'utils/utils';
import { Pagination, Sizing, HeaderTableSort } from '../commons';

const heads = [
  {
    key: 'accountId',
    name: 'Account Id',
    sortName: 'accountId',
  },
  {
    key: 'userId',
    name: 'User Id',
    sortName: 'userId',
  },
  {
    key: 'itemId',
    name: 'Item Id',
    sortName: 'itemId',
  },
  {
    key: 'invoiceId',
    name: 'Invoice Id',
  },
  {
    key: 'date',
    name: 'Date',
    sortName: 'createdDate',
  },
  {
    key: 'source',
    name: 'Source',
  },
  {
    key: 'reason',
    name: 'Reason',
    sortName: 'reason',
  },
  {
    key: 'arType',
    name: 'AR Type',
    sortName: 'arType',
  },
  {
    key: 'amount',
    name: 'Amount',
  },
  {
    key: 'status',
    name: 'Status',
  },
  // {
  //   key: 'detail',
  //   name: 'Detail',
  // },
];
class TableDisputes extends Component {
  constructor() {
    super();
    this.state = {
      keySort: '',
      valueSort: '',
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
    this.props.handleSortDisputes(keySort, valueSort);
  };

  handleClickRow = dispute => {
    this.props.onSelectedDispute(dispute);
  };

  handleDoubleClickRow = id => {
    this.props.history.push(`/ar-operations/disputes/${id}/detail`);
  };

  handleClickSettle = () => {
    this.props.history.push({
      pathname: '/ar-operations/settlements/apply',
      state: { disputeSelected: this.props.disputeSelected },
    });
  };

  renderRow = (row, id) => (
    <tr
      key={id}
      onClick={() => this.handleClickRow(row)}
      onDoubleClick={() => this.handleDoubleClickRow(row.id)}
      className={
        this.props.disputeSelected && this.props.disputeSelected.id === row.id
          ? 'column_active'
          : ''
      }
    >
      <td>{row.accountId}</td>
      <td>{row.userId}</td>
      <td>{row.itemId}</td>
      <td>{row.invoiceId}</td>
      <td>{row.date}</td>
      <td>{row.source}</td>
      <td>{row.reason}</td>
      <td>{row.type}</td>
      <td>{strTwoFractionDigits(row.amount)}</td>
      <td>{row.status}</td>
      {/* <td style={{ textAlign: 'center' }}>
        <Link to={`/ar-operations/disputes/${row.id}/detail`}>
          <i className="fa fa-info-circle font-size-20" />
        </Link>
      </td> */}
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
        />
      );
    }

    return (
      <th key={header.key} scope="col" className="w-25 p-3">
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
            <td colSpan={11} className="txt-error">
              {errorMessage}
            </td>
          </tr>
        </tbody>
      );
    }

    if (!data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={11}>No record has found!</td>
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
      disputeSelected,
    } = this.props;
    const enableSettle =
      (disputeSelected &&
        disputeSelected.status === arOpsEnum.disputeStatus.open) ||
      false;
    return (
      <Col md={12} lg={12}>
        <Card>
          <div className="table-block">
            <CardBody>
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>{heads.map(item => this.renderHeader(item))}</tr>
                </thead>
                {this.renderBody()}
              </table>
            </CardBody>
          </div>
          <div className="table__action">
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
                <div className="pull-right">
                  <Button
                    color="primary"
                    onClick={this.handleClickSettle}
                    style={{ padding: '.375rem .75rem' }}
                    disabled={!enableSettle}
                  >
                    Settle
                  </Button>
                  <Sizing handleSize={handleSize} size={size} />
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    );
  }
}

TableDisputes.propTypes = {
  data: PropTypes.array,
  handleSortDisputes: PropTypes.func,
  handlePage: PropTypes.func,
  page: PropTypes.number,
  isActiveNext: PropTypes.bool,
  handleSize: PropTypes.func,
  size: PropTypes.number,
  history: PropTypes.object,
  errorMessage: PropTypes.string,
  disputeSelected: PropTypes.object,
  onSelectedDispute: PropTypes.func,
};

export default compose(withRouter)(TableDisputes);
