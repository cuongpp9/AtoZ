import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { SortType } from 'constantsApp';
import Select from 'react-select';
import { Pagination, Sizing, HeaderTableSort, ButtonCustom } from '../commons';
import SearchFilterAccounts from './SearchFilterAccounts';

const heads = [
  {
    key: 'actNo',
    name: 'Act No',
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
  },
  {
    key: 'email',
    name: 'Email',
  },
  {
    key: 'city',
    name: 'City',
  },
  {
    key: 'state',
    name: 'State',
  },
  {
    key: 'currency',
    name: 'Currency',
  },
  {
    key: 'status',
    name: 'Status',
  },
  {
    key: 'userId',
    name: 'User Id',
  },
  {
    key: '#of_invoices_in_Collection',
    name: '# of invoices in Collection',
    sortName: 'numberInvoicesInCollection',
  },
];

class AccountsInCollectionTable extends Component {
  constructor() {
    super();
    this.state = {
      keySort: 'firstName',
      valueSort: SortType.asc,
      userIdSelect: null,
      isReassigning: false,
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
    this.props.handleSort(keySort, valueSort);
  };

  handleReassign = () => {
    const { reassignCollectionAgent, rowSelected } = this.props;
    const { userIdSelect } = this.state;
    this.setState({ isReassigning: true });
    const payloadRequest = {
      accountId: rowSelected.accountId,
      userId: rowSelected.userId,
      newUserId: userIdSelect.value,
    };

    reassignCollectionAgent(payloadRequest, ({ success }) => {
      this.setState({ isReassigning: false, userIdSelect: null });
      if (success) {
        this.props.callbackHandleButtonReassign();
      }
    });
  };

  onChangeUserSelect = val => {
    this.setState({ userIdSelect: val });
    this.props.onSelectedAgent(val);
  };

  renderRow = (row, id) => {
    const isSelectedRow = row.index === this.props.rowSelected.index;
    return (
      <tr
        key={id}
        onClick={() => this.props.onSelectedRow(row)}
        className={isSelectedRow ? 'column_active' : null}
      >
        <td>{row.accountId}</td>
        <td>{row.firstName}</td>
        <td>{row.lastName}</td>
        <td>{row.organization}</td>
        <td>{row.email}</td>
        <td>{row.city}</td>
        <td>{row.state}</td>
        <td>{row.currency}</td>
        <td>{row.status}</td>
        <td>{row.userId}</td>
        <td>{row.numberInvoicesInCollection}</td>
      </tr>
    );
  };

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

  renderReAssignAgent() {
    const { userIds, agentSelected, rowSelected = {} } = this.props;
    const { isReassigning } = this.state;
    return (
      <div className="row mt-4 ml-2">
        <div className="w-20 px-3">
          <div className="form__form-group-field form">
            <Select
              name="type"
              options={userIds}
              placeholder="User Id"
              className="form__form-group-select"
              value={this.state.userIdSelect}
              onChange={this.onChangeUserSelect}
              required
              isClearable
            />
          </div>
        </div>
        <div className="w-20 px-3">
          <div className="form__form-group-field form">
            <input
              type="text"
              name="firstName"
              defaultValue={agentSelected.firstName}
              placeholder="First Name"
              readOnly
            />
          </div>
        </div>
        <div className="w-20 px-3">
          <div className="form__form-group-field form">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              defaultValue={agentSelected.lastName}
              readOnly
            />
          </div>
        </div>
        <div className="w-40 px-3">
          <div className="form__form-group-field form">
            <ButtonCustom
              loading={isReassigning}
              className="btn btn-success"
              type="button"
              title="Re-assign Agent"
              titleloading="Re-assigning"
              onClick={this.handleReassign}
              disabled={!rowSelected.index || !this.state.userIdSelect}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {
      handlePage,
      page,
      isActiveNext,
      handleSize,
      size,
      hanldeSearch,
      isSearching,
    } = this.props;
    return (
      <Col md={12} lg={12}>
        <Card>
          <div className="table-block">
            <CardBody>
              <div className="ml-3">
                <Row>
                  <Col md={12}>
                    <SearchFilterAccounts
                      onHandleSearch={hanldeSearch}
                      isSearching={isSearching}
                    />
                  </Col>
                </Row>
              </div>
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
          {this.renderReAssignAgent()}
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
        </Card>
      </Col>
    );
  }
}

AccountsInCollectionTable.propTypes = {
  data: PropTypes.array,
  handleSort: PropTypes.func,
  hanldeSearch: PropTypes.func,
  handlePage: PropTypes.func,
  page: PropTypes.number,
  isActiveNext: PropTypes.bool,
  handleSize: PropTypes.func,
  size: PropTypes.number,
  errorMessage: PropTypes.string,
  isSearching: PropTypes.bool,
  agentSelected: PropTypes.object,
  userIds: PropTypes.array,
  onSelectedAgent: PropTypes.func,
  reassignCollectionAgent: PropTypes.func,
  rowSelected: PropTypes.object,
  onSelectedRow: PropTypes.func,
  callbackHandleButtonReassign: PropTypes.func,
};

export default AccountsInCollectionTable;
