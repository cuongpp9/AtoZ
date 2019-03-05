import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { SortType, collectionsSelect } from 'constantsApp';
import Select from 'react-select';
import { Pagination, Sizing, HeaderTableSort, ButtonCustom } from '../commons';

const heads = [
  {
    key: 'invoiceDate',
    name: 'Invoice Date',
    sortName: 'invoiceDate',
  },
  {
    key: 'total',
    name: 'Total',
  },
  {
    key: 'status',
    name: 'Status',
  },
  {
    key: 'due',
    name: 'Due',
    sortName: 'due',
  },
  {
    key: 'dueDate',
    name: 'Due Date',
    sortName: 'dueDate',
  },
  {
    key: 'invoiceNumber ',
    name: 'Invoice Number',
  },
  {
    key: 'invoiceStatus',
    name: 'Invoice Status',
  },
  {
    key: 'invoiceType',
    name: 'Invoice Type',
  },
];

class TableBillUnits extends Component {
  constructor() {
    super();
    this.state = {
      keySort: '',
      valueSort: '',
      collectionUnitStatus: null,
      notes: '',
      applying: false,
      rowSelected: {},
    };
  }

  handleSelectedRow = rowSelected1 => {
    if (rowSelected1 === this.state.rowSelected) {
      this.setState({ rowSelected: {} });
    } else {
      this.setState({ rowSelected: rowSelected1 });
    }
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
    this.props.handleSort(keySort, valueSort);
  };

  handleApplyBtn = () => {
    const { collectionUnitStatus, notes, rowSelected } = this.state;

    this.setState({ applying: true });
    this.props.modifyCollectionUnit(
      {
        id: rowSelected.id,
        status: collectionUnitStatus.value,
        notes,
      },
      ({ success }) => {
        if (!success) {
          this.setState({ applying: false });
        } else {
          this.setState({
            applying: false,
            collectionUnitStatus: null,
            notes: '',
            rowSelected: {},
          });
          this.props.callbackWhenApply();
        }
      },
    );
  };

  onChangeStatus = val => {
    this.setState({ collectionUnitStatus: val });
  };

  onChangeNotes = evt => {
    this.setState({ notes: evt.target.value });
  };

  renderRow = (row, id) => (
    <tr
      key={id}
      onClick={() => this.handleSelectedRow(row)}
      className={row === this.state.rowSelected ? 'column_active' : null}
    >
      <td>{row.invoiceDate}</td>
      <td>{row.amount}</td>
      <td>{row.status}</td>
      <td>{row.due}</td>
      <td>{row.dueDate}</td>
      <td>
        <Link to="/invoices/267578c3-9ec3-42e2-a872-a23993910b74">
          {row.invoiceId} <i className="fa fa-info-circle" />
        </Link>
      </td>
      <td />
      <td />
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
            <td colSpan={6} className="txt-error">
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
            <td colSpan={6}>No record has found!</td>
          </tr>
        </tbody>
      );
    }
    return <tbody>{data[0].invoicesInCollection.map(this.renderRow)}</tbody>;
  }

  renderTotaCollection() {
    const { data } = this.props;
    const total = data.length ? data[0].totalInCollection : 0;
    return (
      <div className="row mt-3 ml-5">
        <div className="ml-5">
          Total in Collection &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="txt-error">
            {total || 0}
          </span>
        </div>
      </div>
    );
  }

  renderCollectionAppy() {
    const { collectionUnitStatus, applying, notes } = this.state;
    return (
      <div className="row mt-3 ml-5">
        <div className="w-20 px-3">
          <div className="form__form-group-field form">
            <Select
              name="type"
              options={collectionsSelect.status}
              placeholder="Collection Unit Status "
              className="form__form-group-select mt-3"
              value={collectionUnitStatus}
              onChange={this.onChangeStatus}
              required
              isClearable
            />
          </div>
        </div>
        <div className="w-40 px-3">
          <div className="form__form-group-field form">
            <textarea
              type="text"
              name="notes"
              value={notes}
              placeholder="Notes"
              onChange={this.onChangeNotes}
            />
          </div>
        </div>
        <div className="w-40 px-3">
          <div className="form__form-group-field form">
            <ButtonCustom
              loading={applying}
              className="btn btn-primary mt-3"
              type="button"
              title="Apply"
              titleloading="Applying"
              onClick={this.handleApplyBtn}
              disabled={
                !collectionUnitStatus ||
                !notes ||
                !this.state.rowSelected.invoiceId
              }
            />
          </div>
        </div>
      </div>
    );
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
          {this.renderTotaCollection()}
          {this.renderCollectionAppy()}
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

TableBillUnits.propTypes = {
  data: PropTypes.array,
  handleSort: PropTypes.func,
  handlePage: PropTypes.func,
  page: PropTypes.number,
  isActiveNext: PropTypes.bool,
  handleSize: PropTypes.func,
  size: PropTypes.number,
  errorMessage: PropTypes.string,
  modifyCollectionUnit: PropTypes.func,
  callbackWhenApply: PropTypes.func,
  // accountId: PropTypes.string,
  // userId: PropTypes.string,
};

export default TableBillUnits;
