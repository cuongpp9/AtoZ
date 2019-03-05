import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { strTwoFractionDigits } from 'utils/utils';
import { SortType, arOpsEnum } from 'constantsApp';
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
    sortName: 'date',
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
    name: 'Ar Type',
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
class TableWriteOffs extends Component {
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
    this.props.handleSortWriteOffs(keySort, valueSort);
  };

  handleClickRow = rowData => {
    this.props.onSelectTableRow(rowData);
    // this.props.history.push(`/bundle-management/bundle/${id}/detail`);
  };

  handleDoubleClickRow = id => {
    this.props.history.push(`/ar-operations/write-offs/${id}/detail`);
  };

  handleClickReverse = () => {
    this.props.handleClickReverse();
  };
  renderRow = (row, id) => (
    <tr
      key={id}
      onClick={() => this.handleClickRow(row)}
      onDoubleClick={() => this.handleDoubleClickRow(row.id)}
      className={
        this.props.writeOffItemSelected &&
        this.props.writeOffItemSelected.id === row.id
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
        <Link to={`/ar-operations/write-offs/${row.id}/detail`}>
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
      writeOffItemSelected,
    } = this.props;
    const enableReverse =
      (writeOffItemSelected &&
        writeOffItemSelected.status === arOpsEnum.writeOffStatus.writeoff) ||
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
                    disabled={!enableReverse}
                    onClick={this.handleClickReverse}
                    style={{ padding: '.375rem .75rem' }}
                  >
                    Reverse Write-off
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

TableWriteOffs.propTypes = {
  data: PropTypes.array,
  handleSortWriteOffs: PropTypes.func,
  onSelectTableRow: PropTypes.func,
  handleClickReverse: PropTypes.func,
  handlePage: PropTypes.func,
  page: PropTypes.number,
  isActiveNext: PropTypes.bool,
  handleSize: PropTypes.func,
  size: PropTypes.number,
  writeOffItemSelected: PropTypes.object,
  errorMessage: PropTypes.string,
  history: PropTypes.object,
};

export default compose(withRouter)(TableWriteOffs);
