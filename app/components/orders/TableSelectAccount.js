import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
// import className from 'classnames';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Pagination, Sizing } from '../commons';
import AccountRow from './components/AccountRow';

const headers = [
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
    key: 'currency',
    name: 'Currency',
  },
  {
    key: 'status',
    name: 'Status',
  },
  {
    key: 'reason',
    name: 'Reason',
  },
];

class TableSelectAccount extends PureComponent {
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

  renderRow = row => {
    const { onSelect, itemSelected } = this.props;
    return (
      <AccountRow
        key={row.id}
        onSelect={onSelect}
        itemSelected={itemSelected}
        account={row}
      />
    );
  };

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
            <td colSpan={12}>No record has found!</td>
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

TableSelectAccount.propTypes = {
  data: PropTypes.array,
  handlePage: PropTypes.func,
  page: PropTypes.number,
  handleSize: PropTypes.func,
  size: PropTypes.number,
  itemSelected: PropTypes.string,
  onSelect: PropTypes.func,
};

export default compose(withRouter)(TableSelectAccount);
