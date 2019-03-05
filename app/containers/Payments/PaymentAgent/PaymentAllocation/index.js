import React from 'react';
import PropTypes from 'prop-types';
import UnallocationPayments from './UnallocationPayments';
import ManualAllocation from './ManualAllocation';

class PaymentAllocation extends React.PureComponent {
  componentDidMount() {}

  getDataQuery(location) {
    const { search } = location;
    const account = search.split('&')[0];
    const mode = search.split('&')[1];

    if (mode.split('=')[0] === 'paymentStatus') {
      return {
        accountId: account.split('=')[1],
        mode: 'payment',
        status: mode.split('=')[1],
      };
    }
    return {
      accountId: account.split('=')[1],
      mode: 'invoice',
      status: mode.split('=')[1],
    };
  }

  render() {
    const { location } = this.props;
    const { accountId, mode, status } = this.getDataQuery(location);
    if (mode === 'payment') {
      return <UnallocationPayments accountId={accountId} status={status} />;
    }

    const {
      state: { selectedPayment },
    } = location;

    return (
      <ManualAllocation
        accountId={accountId}
        selectedPayment={selectedPayment}
      />
    );
  }
}

PaymentAllocation.propTypes = {
  location: PropTypes.object,
};

export default PaymentAllocation;
