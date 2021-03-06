import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { SortType } from 'constantsApp';
import { Pagination, Sizing, HeaderTableSort } from '../commons';

const heads = [
  {
    key: 'id',
    name: 'Id',
  },
  {
    key: 'status',
    name: 'Status',
    sortName: 'status',
  },
  {
    key: 'type',
    name: 'Type',
    sortName: 'type',
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
    key: 'details',
    name: 'Details',
  },
];

class Table extends PureComponent {
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
    this.props.handleSort(keySort, valueSort);
  };

  handleClickRow = row => {
    this.props.handleClickRow(row);
  };
  handleDetailInfor = id => {
    this.props.history.push(`/user-management/roles/${id}/detail`);
  };
  renderRow = row => (
    <tr
      key={row.id}
      className={
        this.props.selectedRow && this.props.selectedRow.id === row.id
          ? 'column_active'
          : ''
      }
      onClick={() => this.handleClickRow(row)}
    >
      <td>{row.id}</td>
      <td>{row.status}</td>
      <td>{row.type}</td>
      <td>{row.name}</td>
      <td>{row.description}</td>
      <td
        style={{ cursor: 'pointer' }}
        onClick={() => this.handleDetailInfor(row.id)}
      >
        <i className="fa fa-info-circle font-size-25" />
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
            <td colSpan={12} className="txt-error">
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
            <td colSpan={12}>No record has found!</td>
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
              <div className="table__block">
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr>{heads.map(item => this.renderHeader(item))}</tr>
                  </thead>
                  {this.renderBody(data)}
                </table>
              </div>
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

Table.propTypes = {
  data: PropTypes.array,
  handleSort: PropTypes.func,
  handlePage: PropTypes.func,
  page: PropTypes.number,
  isActiveNext: PropTypes.bool,
  handleSize: PropTypes.func,
  size: PropTypes.number,
  history: PropTypes.object,
  errorMessage: PropTypes.string,
  handleClickRow: PropTypes.func,
  selectedRow: PropTypes.object,
};

export default compose(withRouter)(Table);
