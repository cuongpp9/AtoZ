import React from 'react';
import PropTypes from 'prop-types';
import Billing from './Billing';
class Billings extends React.PureComponent {
  // onToggleModalAdd = () => {
  //   this.setState(preState => ({ isOpenModalAdd: !preState.isOpenModalAdd }));
  // };

  render() {
    const { account, modifyAccount, isNonPaying } = this.props;
    return (
      <div className="table-content">
        {account.billingProfiles &&
          account.billingProfiles.map(billing => (
            <Billing
              key={billing.id}
              billing={billing}
              accountId={account.id}
              modifyAccount={modifyAccount}
              paymentProfiles={account.paymentProfiles || []}
              disableModify={isNonPaying}
            />
          ))}
      </div>
    );
  }
}

Billings.propTypes = {
  account: PropTypes.object,
  modifyAccount: PropTypes.func,
  isNonPaying: PropTypes.bool,
};

export default Billings;
