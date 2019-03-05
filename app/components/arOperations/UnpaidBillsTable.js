import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import className from 'classnames';
import { Col, Row, CardBody } from 'reactstrap';
import { Pagination, Sizing } from 'components/commons';

const headers = [
  'Invoice Date',
  'Status',
  'Due',
  'Due Date',
  'Invoice Number',
  'Invoice Status',
  'Invoice Type',
];
class UnpaidBillsTable extends React.Component {
  constructor() {
    super();
    this.state = { isActiveNext: false };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.items !== nextProps.items) {
      const { size } = nextProps;
      if (nextProps.items && nextProps.items.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  renderHeaderTable() {
    return (
      <thead>
        <tr>{headers.map(item => <th key={item}>{item}</th>)}</tr>
      </thead>
    );
  }

  renderRow = (row, id) => (
    <tr
      key={id}
      onClick={() => this.props.onSelectItem(row)}
      className={className({
        'column-active': this.props.itemSelected === row.id,
      })}
    >
      <td>{row.invoiceDate}</td>
      <td>{row.status}</td>
      <td>{row.due}</td>
      <td>{row.dueDate}</td>
      <td>{row.id}</td>
      <td>{row.status}</td>
      <td>{row.invoiceType}</td>
    </tr>
  );

  renderBody(data) {
    const { accountId } = this.props;
    if (!data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={8}>{`No record has found for ${accountId}`}</td>
          </tr>
        </tbody>
      );
    }
    return <tbody>{data.map(this.renderRow)}</tbody>;
  }

  render() {
    const { accountId } = this.props;
    if (!accountId) {
      return (
        <Col md={12} lg={12}>
        <CardBody>
          <table className="table table-bordered">
            {this.renderHeaderTable()}
            <tbody>
              <tr>
                <td colSpan={8}><div className="font-bold txt-error">Please fill in Account Id first!</div></td>
              </tr>
            </tbody>
          </table>
        </CardBody>
        </Col>
      )
    }

    const { items, size, page, handlePage, handleSize } = this.props;
    const { isActiveNext } = this.state;
    return (
      <Col md={12} lg={12}>
        <CardBody>
          <table className="table table-bordered">
            {this.renderHeaderTable()}
            {this.renderBody(_.uniqBy(items, 'id'))}
          </table>
        </CardBody>
        <div className="table__action p-l p-r">
          <Row>
            <Col md={6}>
              <Pagination
                page={5}
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
      </Col>
    );
  }
}

UnpaidBillsTable.propTypes = {
  items: PropTypes.array,
  itemSelected: PropTypes.string,
  onSelectItem: PropTypes.func,
  page: PropTypes.number,
  handlePage: PropTypes.func,
  size: PropTypes.number,
  handleSize: PropTypes.func,
  accountId: PropTypes.string,
};

export default UnpaidBillsTable;
