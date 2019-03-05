import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { SortType } from 'constantsApp';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { getAccountId } from 'asynStorage/accountStorage';
import { Pagination, Sizing, HeaderTableSort } from '../commons';
import AccountRow from './AccountRow';

const heads = [
  {
    key: 'acctNo',
    name: 'Acct No',
  },
  {
    key: 'firstName',
    name: 'First Name',
    sortName: 'firstName',
  },
  {
    key: 'lastName',
    name: 'Last Name',
    sortName: 'lastName',
  },
  {
    key: 'organization',
    name: 'Organization',
    sortName: 'organization',
  },
  {
    key: 'email',
    name: 'Email',
  },
  {
    key: 'city',
    name: 'City',
    sortName: 'city',
  },
  {
    key: 'state',
    name: 'State',
    sortName: 'state',
  },
  {
    key: 'status',
    name: 'Status',
  },
];

class TableSearchAccounts extends Component {
  constructor() {
    super();
    this.state = {
      keySort: '',
      valueSort: '',
    };
  }

  handleClickRow = id => {
    this.props.handleSelectAccountId(id);
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
    this.props.handleSortAccount(keySort, valueSort);
  };

  renderRow = row => (
    <AccountRow
      account={row}
      key={row.id}
      onHandleClick={this.handleClickRow}
      clzzNames={getAccountId() === row.id ? 'column_active' : ''}
    />
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
            <td colSpan={10} className="txt-error">
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
            <td colSpan={10}>No record has found!</td>
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

TableSearchAccounts.propTypes = {
  data: PropTypes.array,
  handlePage: PropTypes.func,
  page: PropTypes.number,
  isActiveNext: PropTypes.bool,
  handleSize: PropTypes.func,
  handleSortAccount: PropTypes.func,
  size: PropTypes.number,
  errorMessage: PropTypes.string,
  // accountSelectedId: PropTypes.string,
  handleSelectAccountId: PropTypes.func,
};

export default compose(withRouter)(TableSearchAccounts);
