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
    name: 'Id',
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
    key: 'company',
    name: 'Company',
    sortName: 'company',
  },
  {
    key: 'revenueType',
    name: 'Revenue Type',
  },

  {
    key: 'productFamily',
    name: 'Product Family',
    sortName: 'productFamily',
  },
  {
    key: 'productLine',
    name: 'Product Line',
    sortName: 'productLine',
  },
  {
    key: 'productType',
    name: 'Product Type',
  },
  {
    key: 'productSubType',
    name: 'Product Sub Type',
  },
  {
    key: 'status',
    name: 'Status',
  },
];
class TableItems extends Component {
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
    this.props.handleSortItems(keySort, valueSort);
  };

  handleClickRow = id => {
    this.props.history.push(`/pricing-management/items/${id}/detail`);
  };

  renderRow = (row, id) => (
    <tr key={id} onClick={() => this.handleClickRow(row.id)}>
      <td>{row.id}</td>
      <td>{row.name}</td>
      <td>{row.description}</td>
      <td>{row.company}</td>
      <td>{row.revenueType}</td>
      <td>{row.productFamily}</td>
      <td>{row.productLine}</td>
      <td>{row.productType}</td>
      <td>{row.productSubType}</td>
      <td>{row.status}</td>
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
            <td colSpan={10} className="txt-error">
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
TableItems.propTypes = {
  data: PropTypes.array,
  handleSortItems: PropTypes.func,
  handlePage: PropTypes.func,
  page: PropTypes.number,
  isActiveNext: PropTypes.bool,
  handleSize: PropTypes.func,
  size: PropTypes.number,
  history: PropTypes.object,
  errorMessage: PropTypes.string,
};

export default compose(withRouter)(TableItems);
