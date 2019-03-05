import React from 'react';
import PropTypes from 'prop-types';

import PaymentConfiguration from './PaymentConfiguration';

class PaymentAdmin extends React.PureComponent {
  renderContent() {
    const {
      match: {
        params: { childRoute },
      },
    } = this.props;
    switch (childRoute) {
      case 'payment-configuration':
        return <PaymentConfiguration />;
      default:
        return <div />;
    }
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

PaymentAdmin.propTypes = {
  match: PropTypes.object,
};

export default PaymentAdmin;
