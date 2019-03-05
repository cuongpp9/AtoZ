import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { SortType } from 'constantsApp';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Pagination, Sizing, HeaderTableSort } from '../commons';
const heads = [
  {
    key: 'accountId',
    name: 'Account Id',
    sortName: 'accountId',
  },
  {
    key: 'invoiceId',
    name: 'Invoice #',
  },
  {
    key: 'invoiceDate',
    name: 'Invoice Date',
  },
  {
    key: 'dueDate',
    name: 'Due Date',
  },
  {
    key: 'daysInCollection',
    name: 'Days in Collection',
  },
  {
    key: 'status',
    name: 'Status',
    sortName: 'status',
  },
  {
    key: 'lastActionDate',
    name: 'Last Action Date',
  },
  {
    key: 'closedDate',
    name: 'Closed Date',
  },
];
class TableCollectionHistory extends Component {
  constructor() {
    super();
    this.state = {
      keySort: '',
      valueSort: '',
    };
  }

  handleClickRow = id => {
    this.props.history.push(
      `/collections/collection-agent/collection-history/${id}`,
    );
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
    this.props.handleSortHistory(keySort, valueSort);
  };
  renderRow = (row, id) => (
    <tr key={id} onClick={() => this.handleClickRow(row.id)}>
      <td>{row.accountId}</td>
      <td>{row.invoiceId}</td>
      <td>{row.invoiceDate}</td>
      <td>{row.dueDate}</td>
      <td>{row.daysInCollection}</td>
      <td>{row.status}</td>
      <td>{row.lastActionDate}</td>
      <td>{row.closedDate}</td>
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
            <td colSpan={8} className="txt-error">
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
            <td colSpan={8}>No record has found!</td>
          </tr>
        </tbody>
      );
    }
    return <tbody>{data.map(this.renderRow)}</tbody>;
  }

  render() {
    const { handlePage, page, isActiveNext, handleSize, size } = this.props;
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
                <Sizing handleSize={handleSize} size={size} />
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    );
  }
}

TableCollectionHistory.propTypes = {
  data: PropTypes.array,
  handlePage: PropTypes.func,
  page: PropTypes.number,
  isActiveNext: PropTypes.bool,
  handleSize: PropTypes.func,
  handleSortHistory: PropTypes.func,
  size: PropTypes.number,
  history: PropTypes.object,
  errorMessage: PropTypes.string,
};

export default compose(withRouter)(TableCollectionHistory);
