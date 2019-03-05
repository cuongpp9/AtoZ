import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col } from 'reactstrap';

class CollectionActionInvoiceTable extends Component {
  renderRow = (row, id) => (
    <tr key={id}>
      <td>{row.index}</td>
      <td>{row.action}</td>
      <td>{row.description}</td>
      <td>{row.date}</td>
    </tr>
  );

  renderHeader() {
    return (
      <thead>
        <tr>
          <th scope="col" className="p-2 text-center" colSpan={4}>
            Collection Actions for Invoice
          </th>
        </tr>
        <tr>
          <th scope="col" className="w-10 p-2" style={{ whiteSpace: 'normal' }}>
            Index
          </th>
          <th scope="col" className="w-30 p-2" style={{ whiteSpace: 'normal' }}>
            Action
          </th>
          <th scope="col" className="w-30 p-2" style={{ whiteSpace: 'normal' }}>
            Description
          </th>
          <th scope="col" className="w-20 p-2" style={{ whiteSpace: 'normal' }}>
            Date
          </th>
        </tr>
      </thead>
    );
  }

  renderBody() {
    const { data } = this.props;

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
                {this.renderHeader()}
                {this.renderBody()}
              </table>
            </CardBody>
          </div>
        </Card>
      </Col>
    );
  }
}

CollectionActionInvoiceTable.propTypes = {
  data: PropTypes.array,
};

export default CollectionActionInvoiceTable;
