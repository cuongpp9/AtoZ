import React from 'react';
import PropTypes from 'prop-types';

import ViewPaymentActivity from './ViewPaymentActivity';
import PaymentAllocation from './PaymentAllocation/ManualAllocation';
import PaymentSuspense from './PaymentSuspense';
import OneOffPayment from './OneOffPayment';
import SearchAccount from './SearchAccount';

class PaymentAdmin extends React.PureComponent {
  renderContent() {
    const {
      match: {
        params: { childRoute },
      },
    } = this.props;
    switch (childRoute) {
      case 'view-payment-activity':
        return <ViewPaymentActivity {...this.props} />;
      case 'payment-allocation':
        return <PaymentAllocation {...this.props} />;
      case 'payment-suspense':
        return <PaymentSuspense {...this.props} />;
      case 'one-off-payment':
        return <OneOffPayment {...this.props} />;
      case 'search-account':
        return <SearchAccount {...this.props} />;
      default:
        return <div />;
    }
  }

  render() {
    return <div className="global-page">{this.renderContent()}</div>;
  }
}

PaymentAdmin.propTypes = {
  match: PropTypes.object,
};

export default PaymentAdmin;
