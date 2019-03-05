import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { SortType } from 'constantsApp';
import { Pagination, Sizing, HeaderTableSort } from '../commons';
const heads = [
  {
    key: 'id',
    name: 'ID',
  },
  {
    key: 'type',
    name: 'Type',
  },
  {
    key: 'status',
    name: 'Status',
    sortName: 'status',
  },
  {
    key: 'total',
    name: 'Total',
  },
  {
    key: 'non-paying-total',
    name: 'Non-Paying Total',
  },
  {
    key: 'billTotal',
    name: 'Bill Total',
  },
  {
    key: 'invoiceNumber',
    name: 'Invoice Number',
  },
  {
    key: 'startDate',
    name: 'Start Date',
    sortName: 'startDate',
  },
  {
    key: 'endDate',
    name: 'End Date',
    sortName: 'endDate',
  },
  // {
  //   key: 'detail',
  //   name: 'Detail',
  // },
];
class TableBillUnit extends Component {
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
    this.props.handleSortBill(keySort, valueSort);
  };

  // handleClickRow = id => {
  //   this.props.history.push(`/bundle-management/bundle/${id}/detail`);
  // };

  renderRow = row => (
    <tr key={row.id}>
      <td>{row.id}</td>
      <td>{row.type}</td>
      <td>{row.status}</td>
      <td>{row.total}</td>
      <td>{row.nonPayingTotal}</td>
      <td>{row.billTotal}</td>
      <td>
        <Link to="/invoices/f5f79aa0-7cfc-401e-9d2d-2b58204668e2">
          f5f79aa0-7cfc-401e-9d2d-2b58204668e2{' '}
          <i className="fa fa-info-circle" />
        </Link>
      </td>
      <td>{row.startDate}</td>
      <td>{row.endDate}</td>
      {/* <td><span><i className=""></i></span></td> */}
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

  renderBody(data) {
    if (!data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={9}>No record has found!</td>
          </tr>
        </tbody>
      );
    }
    return <tbody>{data.map(this.renderRow)}</tbody>;
  }

  render() {
    const {
      data,
      handlePage,
      page,
      isActiveNext,
      handleSize,
      size,
    } = this.props;
    return (
      <Col md={12} lg={12}>
        <Card>
          <div className="table-block">
            <CardBody>
              <table className="table table-hover">
                <thead>
                  <tr>{heads.map(item => this.renderHeader(item))}</tr>
                </thead>
                {this.renderBody(data)}
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

TableBillUnit.propTypes = {
  data: PropTypes.array,
  handleSortBill: PropTypes.func,
  handlePage: PropTypes.func,
  page: PropTypes.number,
  isActiveNext: PropTypes.bool,
  handleSize: PropTypes.func,
  size: PropTypes.number,
  // history: PropTypes.object,
};

export default compose(withRouter)(TableBillUnit);
