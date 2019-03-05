import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Pagination, Sizing } from '../commons';

class AgentSumaryActivityTable extends Component {
  renderRow = (row, id) => (
    <tr key={id}>
      <td>{row.userId}</td>
      <td>{row.firstName}</td>
      <td>{row.lastName}</td>
      <td>{row.countOfAccounts}</td>
      <td>{row.averageAgeInCollection}</td>
      <td>{row.countOfAccountsResolved}</td>
    </tr>
  );

  renderHeader() {
    return (
      <tr>
        <th scope="col" className="w-20 p-2" style={{ whiteSpace: 'normal' }}>
          User Id
        </th>
        <th scope="col" className="w-20 p-2" style={{ whiteSpace: 'normal' }}>
          First Name
        </th>
        <th scope="col" className="w-20 p-2" style={{ whiteSpace: 'normal' }}>
          Last Name
        </th>
        <th scope="col" className="w-15 p-2" style={{ whiteSpace: 'normal' }}>
          Number of accounts in Collection
        </th>
        <th scope="col" className="w-10 p-2" style={{ whiteSpace: 'normal' }}>
          Average Age in Collection
        </th>
        <th scope="col" className="w-15 p-2" style={{ whiteSpace: 'normal' }}>
          Number of accounts out of Collection in last 30 days
        </th>
      </tr>
    );
  }

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
                <thead>{this.renderHeader()}</thead>
                {this.renderBody()}
              </table>
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
            </CardBody>
          </div>
        </Card>
      </Col>
    );
  }
}

AgentSumaryActivityTable.propTypes = {
  data: PropTypes.array,
  handlePage: PropTypes.func,
  page: PropTypes.number,
  isActiveNext: PropTypes.bool,
  handleSize: PropTypes.func,
  size: PropTypes.number,
  errorMessage: PropTypes.string,
};

export default AgentSumaryActivityTable;
