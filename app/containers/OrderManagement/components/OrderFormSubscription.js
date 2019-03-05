import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { TableFormSubscription, TableServiceUnit } from 'components/orders';
class OrderFormSubscription extends React.PureComponent {
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
      onChangeSelect,
      onChangeText,
      subscriptionReason,
      subscriptionStatus,
      renewalTermUnit,
      renewalTerm,
      isSuspend,
      isResume,
      isCancel,
      isRenew,
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
          <TableFormSubscription
            data={subscription}
            errorSubscription={errorSubscription}
            onChangeSelect={onChangeSelect}
            onChangeText={onChangeText}
            subscriptionReason={subscriptionReason}
            subscriptionStatus={subscriptionStatus}
            renewalTermUnit={renewalTermUnit}
            renewalTerm={renewalTerm}
            isSuspend={isSuspend}
            isResume={isResume}
            isCancel={isCancel}
            isRenew={isRenew}
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
              <TableServiceUnit
                data={serviceUnits}
                errorServiceUnits={errorServiceUnits}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
OrderFormSubscription.propTypes = {
  aSelectedId: PropTypes.string,
  subscription: PropTypes.object,
  serviceUnits: PropTypes.array,
  errorSubscription: PropTypes.string,
  errorServiceUnits: PropTypes.string,
  onChangeSelect: PropTypes.func,
  onChangeText: PropTypes.func,
  subscriptionReason: PropTypes.object,
  subscriptionStatus: PropTypes.object,
  renewalTermUnit: PropTypes.object,
  renewalTerm: PropTypes.any,
  isSuspend: PropTypes.bool,
  isResume: PropTypes.bool,
  isCancel: PropTypes.bool,
  isRenew: PropTypes.bool,
};

export default OrderFormSubscription;
