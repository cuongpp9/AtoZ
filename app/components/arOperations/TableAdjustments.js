import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { strTwoFractionDigits } from 'utils/utils';
import { SortType } from 'constantsApp';
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
    key: 'type',
    name: 'Type',
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
];
class TableAdjustments extends Component {
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
    this.props.handleSortAdjustments(keySort, valueSort);
  };

  handleClickRow = id => {
    this.props.history.push(`/ar-operations/adjustments/${id}/detail`);
  };

  renderRow = (row, id) => (
    <tr key={id} onClick={() => this.handleClickRow(row.id)}>
      <td>{row.accountId}</td>
      <td>{row.userId}</td>
      <td>{row.itemId}</td>
      <td>{row.invoiceId}</td>
      <td>{row.startDate}</td>
      <td>{row.source}</td>
      <td>{row.reason}</td>
      <td>{row.type}</td>
      <td>{row.arType}</td>
      <td>{strTwoFractionDigits(row.amount)}</td>
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
    const { handlePage, page, isActiveNext, handleSize, size } = this.props;
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
                <Sizing handleSize={handleSize} size={size} />
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    );
  }
}

TableAdjustments.propTypes = {
  data: PropTypes.array,
  handleSortAdjustments: PropTypes.func,
  handlePage: PropTypes.func,
  page: PropTypes.number,
  isActiveNext: PropTypes.bool,
  handleSize: PropTypes.func,
  size: PropTypes.number,
  history: PropTypes.object,
  errorMessage: PropTypes.string,
};

export default compose(withRouter)(TableAdjustments);
