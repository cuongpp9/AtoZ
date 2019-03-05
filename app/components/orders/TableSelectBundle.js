import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import className from 'classnames';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Pagination, Sizing } from '../commons';

const headers = [
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
  // {
  //   key: 'salesChannel',
  //   name: 'Sales Channel',
  //   sortName: 'salesChannel',
  // },
  // {
  //   key: 'marketSegment',
  //   name: 'Market Segment',
  //   sortName: 'marketSegment',
  // },
  // {
  //   key: 'accountType',
  //   name: 'Account Type',
  //   sortName: 'accountType',
  // },
  // {
  //   key: 'accountSubType',
  //   name: 'Account Sub Type',
  //   sortName: 'accountSubType',
  // },
  // {
  //   key: 'country',
  //   name: 'Country',
  //   sortName: 'country',
  // },
  // {
  //   key: 'currency',
  //   name: 'Currency',
  //   sortName: 'currency',
  // },
  // {
  //   key: 'status',
  //   name: 'Status',
  // },
];

class TableSelectBundle extends PureComponent {
  constructor() {
    super();
    this.state = { isActiveNext: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && this.props.data !== nextProps.data) {
      const { size } = nextProps;
      if (nextProps.data && nextProps.data.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  renderRow = row => (
    <tr
      key={row.id}
      onClick={() => this.props.onSelect(row)}
      className={className({
        'column-active': this.props.itemSelected.some(
          el => el && el.id === row.id,
        ),
      })}
    >
      <td>{row.id}</td>
      <td>{row.name}</td>
      <td>{row.description}</td>
      <td style={{ width: 55 }}>
        {this.props.itemSelected.some(el => el && el.id === row.id) ? (
          <i className="fa fa-check" />
        ) : null}
      </td>
    </tr>
  );

  renderHeaderTable() {
    return (
      <thead>
        <tr>{headers.map(item => <th key={item.key}>{item.name}</th>)}</tr>
      </thead>
    );
  }

  renderBody(data) {
    if (!data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={4}>No record has found!</td>
          </tr>
        </tbody>
      );
    }
    return <tbody>{data.map(this.renderRow)}</tbody>;
  }

  render() {
    const { data, handlePage, page, handleSize, size } = this.props;
    const { isActiveNext } = this.state;
    return (
      <Col md={12} lg={12}>
        <Card>
          <div className="table-block">
            <CardBody>
              <div className="table__block">
                <table className="table table-hover table-bordered">
                  {this.renderHeaderTable()}
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

TableSelectBundle.propTypes = {
  data: PropTypes.array,
  handlePage: PropTypes.func,
  page: PropTypes.number,
  handleSize: PropTypes.func,
  size: PropTypes.number,
  itemSelected: PropTypes.array,
  onSelect: PropTypes.func,
};

export default compose(withRouter)(TableSelectBundle);
