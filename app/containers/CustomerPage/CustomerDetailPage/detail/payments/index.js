import React from 'react';
import PropTypes from 'prop-types';
import Payment from './Payment';

class Payments extends React.PureComponent {
  // onToggleModalAdd = () => {
  //   this.setState(preState => ({ isOpenModalAdd: !preState.isOpenModalAdd }));
  // };

  render() {
    const { account, modifyAccount, isNonPaying } = this.props;
    return (
      <div className="table-content">
        {account.paymentProfiles &&
          account.paymentProfiles.map(payment => (
            <Payment
              key={payment.id}
              payment={payment}
              modifyAccount={modifyAccount}
              accountId={account.id}
              disableModify={isNonPaying}
            />
          ))}
      </div>
    );
  }
}

Payments.propTypes = {
  account: PropTypes.object,
  modifyAccount: PropTypes.func,
  isNonPaying: PropTypes.bool,
};

export default Payments;
