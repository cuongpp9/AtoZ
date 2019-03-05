import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';

const ErrorDetail = ({ msg }) => (
  <div className="table-content">
    <Col md={12}>
      <form className="row table-content__block">
        <div className="txt-error">{msg}</div>
      </form>
    </Col>
  </div>
);

ErrorDetail.propTypes = {
  msg: PropTypes.string,
};

export default ErrorDetail;
