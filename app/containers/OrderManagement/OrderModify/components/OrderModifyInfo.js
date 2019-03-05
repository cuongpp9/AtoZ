import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { TableSubscription } from 'components/orders';
import TableFormServiceUnit from './TableFormServiceUnit';
class OrderModifyInfo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      aSelectedId,
      subscription,
      serviceUnits,
      errorSubscription,
      errorServiceUnits,
      getPriceUnits,
      changeLines,
    } = this.props;
    return (
      <div className="form-subscription">
        <div className="form-subscription__header">
          <Row>
            <Col md={12}>
              <h3 className="bold-text">
                Subscription &nbsp;&nbsp;
                <p>
                  <span className="account-detail">Account Number:</span>&nbsp;&nbsp;
                  <span className="account-detail">{aSelectedId}</span>
                </p>
              </h3>
            </Col>
          </Row>
        </div>
        <div className="form-subscription__body">
          <TableSubscription
            data={subscription}
            errorSubscription={errorSubscription}
          />
          <div className="table-service-unit">
            <div className="table-service-unit__header">
              <Row>
                <Col md={12}>
                  <h3 className="bold-text">Service Units</h3>
                </Col>
              </Row>
            </div>
            <div className="table-service-unit__body">
              <TableFormServiceUnit
                data={serviceUnits}
                errorServiceUnits={errorServiceUnits}
                getPriceUnits={getPriceUnits}
                changeLines={changeLines}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
OrderModifyInfo.propTypes = {
  aSelectedId: PropTypes.string,
  subscription: PropTypes.object,
  serviceUnits: PropTypes.array,
  errorSubscription: PropTypes.string,
  errorServiceUnits: PropTypes.string,
  getPriceUnits: PropTypes.func,
  changeLines: PropTypes.func,
};

export default OrderModifyInfo;
