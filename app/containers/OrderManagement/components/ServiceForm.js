import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ButtonToolbar, Button } from 'reactstrap';
import TableFormService from './TableFormService';
import TableFormLine from './TableFormLine';

class ServiceForm extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLine: false,
    };
  }

  showLine = () => {
    this.setState({ isLine: !this.state.isLine });
  };

  render() {
    const {
      bundleName,
      changeLines,
      parentName,
      packageName,
      service,
      disabledBtnOverrideLine,
    } = this.props;
    const { isLine } = this.state;
    return (
      <div className="form-service">
        <div className="form-service-content">
          <TableFormService
            service={service}
            bundleName={bundleName}
            packageName={packageName}
          />
          {isLine && (
            <div className="form-child-line">
              <div className="form-child-line__header">
                <Row>
                  <Col md={12}>
                    <h3 className="bold-text">Lines</h3>
                  </Col>
                </Row>
              </div>
              <TableFormLine
                lines={service.lines}
                parentName={parentName}
                serviceId={service.id}
                changeLines={changeLines}
              />
            </div>
          )}
          <ButtonToolbar className="override-btn">
            <Button
              color={`${isLine ? 'secondary' : 'success'}`}
              type="button"
              onClick={() => this.showLine()}
              disabled={disabledBtnOverrideLine}
            >
              {`${isLine ? 'Hide Lines' : 'Override Lines'}`}
            </Button>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}
ServiceForm.propTypes = {
  bundleName: PropTypes.string,
  changeLines: PropTypes.func,
  parentName: PropTypes.string,
  service: PropTypes.object,
  packageName: PropTypes.string,
  disabledBtnOverrideLine: PropTypes.bool,
};

ServiceForm.defaultProps = {
  packageName: '',
  disabledBtnOverrideLine: false,
}

export default ServiceForm;
