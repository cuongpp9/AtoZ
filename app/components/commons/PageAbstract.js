import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'reactstrap';
const PageAbstract = ({ children, title }) => (
  <div className="container-inner">
    <Container>
      {title && (
        <Row>
          <Col md={12}>
            <h3 className="page-title">{title}</h3>
          </Col>
        </Row>
      )}
      {children}
    </Container>
  </div>
);
PageAbstract.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};

export default PageAbstract;
