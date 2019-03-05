import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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
    key: 'name',
    name: 'Name',
    sortName: 'name',
  },
  {
    key: 'description',
    name: 'Description',
  },
  {
    key: 'salesChannel',
    name: 'Sales Channel',
    sortName: 'salesChannel',
  },
  {
    key: 'marketSegment',
    name: 'Market Segment',
    sortName: 'marketSegment',
  },
  {
    key: 'accountType',
    name: 'Account Type',
    sortName: 'accountType',
  },
  {
    key: 'accountSubType',
    name: 'Account Sub Type',
    sortName: 'accountSubType',
  },
  {
    key: 'serviceType',
    name: 'Service Type',
    sortName: 'serviceType',
  },
  {
    key: 'pricingModel',
    name: 'Pricing Model',
  },
  {
    key: 'transactionType',
    name: 'Transaction Type',
    sortName: 'transactionType',
  },
  {
    key: 'serviceAddOn',
    name: 'Service Add On',
  },
  {
    key: 'itemId',
    name: 'Item Id',
  },
  {
    key: 'status',
    name: 'Status',
    sortName: 'status',
  },
  {
    key: 'startDate',
    name: 'Created Date',
    sortName: 'createdDate',
  },
];
class TablePriceOffer extends Component {
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
    this.props.handleSortPriceOffers(keySort, valueSort);
  };

  handleClickRow = id => {
    this.props.history.push(`/pricing-management/price-offers/${id}/detail`);
  };

  renderRow = (row, id) => (
    <tr key={id} onClick={() => this.handleClickRow(row.id)}>
      <td>{row.id}</td>
      <td>{row.name}</td>
      <td>{row.description}</td>
      <td>{row.salesChannel}</td>
      <td>{row.marketSegment}</td>
      <td>{row.accountType}</td>
      <td>{row.accountSubType}</td>
      <td>{row.serviceType}</td>
      <td>{row.pricingModel}</td>
      <td>{row.transactionType}</td>
      <td>{row.serviceAddOn}</td>
      <td>{row.itemId}</td>
      <td>{row.status}</td>
      <td>{row.startDate}</td>
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
    const { errorMessage, data } = this.props;
    if (errorMessage) {
      return (
        <tbody>
          <tr>
            <td colSpan={14} className="txt-error">
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
            <td colSpan={14}>No record has found!</td>
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
              <table className="table table-hover">
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
                  handlePage={handlePage}
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

TablePriceOffer.propTypes = {
  data: PropTypes.array,
  handleSortPriceOffers: PropTypes.func,
  handlePage: PropTypes.func,
  page: PropTypes.number,
  isActiveNext: PropTypes.bool,
  handleSize: PropTypes.func,
  size: PropTypes.number,
  history: PropTypes.object,
  errorMessage: PropTypes.string,
};

export default compose(withRouter)(TablePriceOffer);
