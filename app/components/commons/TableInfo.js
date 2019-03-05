import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col } from 'reactstrap';

const TableInfo = ({ title, heads, children }) => (
  <div className="table-info">
    {title && <div className="table-info__header">{title}</div>}
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <table className="table table-hover">
            <thead>
              <tr>{heads.map(item => <th key={item.key}>{item.name}</th>)}</tr>
            </thead>
            {children}
          </table>
        </CardBody>
      </Card>
    </Col>
  </div>
);
TableInfo.propTypes = {
  title: PropTypes.string,
  heads: PropTypes.array,
  children: PropTypes.any,
};
export default TableInfo;
