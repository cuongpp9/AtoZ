import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col } from 'reactstrap';

const heads = [
  {
    key: 'currencyId',
    name: 'Currency Id',
  },
  {
    key: 'amount',
    name: 'Amount',
  },
  {
    key: 'creditLimit',
    name: 'Credit Limit',
  },
];

class TableCollectionUnits extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  renderRow = (row, idx) => (
    <tr key={idx}>
      <td>{row.currencyId}</td>
      <td>{row.amount}</td>
      <td>{row.creditLimit}</td>
    </tr>
  );

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

    if (!data || !data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={6}>No record has found!</td>
          </tr>
        </tbody>
      );
    }

    return <tbody>{data && data.map(this.renderRow)}</tbody>;
  }

  render() {
    return (
      <Col md={12} lg={12}>
        <Card>
          <div className="table-block">
            <CardBody>
              <table className="table table-hover">
                <thead>
                  <tr>
                    {heads.map(item => <th key={item.key}>{item.name}</th>)}
                  </tr>
                </thead>
                {this.renderBody()}
              </table>
            </CardBody>
          </div>
        </Card>
      </Col>
    );
  }
}

TableCollectionUnits.propTypes = {
  data: PropTypes.array,
  errorMessage: PropTypes.string,
};

export default TableCollectionUnits;
