import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { Collapse } from '../commons';

const FormCollapse = ({
  children,
  title,
  isActive,
  onToggleTab,
  state,
  noCardBody,
}) => {
  if (noCardBody) {
    return (
      <div className="form-collapse">
        <Col md={12} lg={12}>
          <Card>
            <Collapse
              title={title}
              className="boxed"
              isActive={isActive}
              onToggleTab={onToggleTab}
              state={state}
            >
              {children}
            </Collapse>
          </Card>
        </Col>
      </div>
    );
  }
  return (
    <div className="form-collapse">
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <Collapse
              title={title}
              className="boxed"
              isActive={isActive}
              onToggleTab={onToggleTab}
              state={state}
            >
              {children}
            </Collapse>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

FormCollapse.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  isActive: PropTypes.bool,
  noCardBody: PropTypes.bool,
  onToggleTab: PropTypes.func,
  state: PropTypes.any,
};

export default FormCollapse;
