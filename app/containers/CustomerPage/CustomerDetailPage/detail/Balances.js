import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  TableUnitsBalances,
  TableUnitsGrants,
  TableUnitsAccumulators,
} from 'components/customers';
import { makeGetBalanceUnit, makeErrorMessageBU } from '../../selectors';

class Balances extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { balanceUnit, errorBalanceUnit } = this.props;
    if (!balanceUnit) {
      return null;
    }
    return (
      <div className="account-balance">
        <div className="account-balance__balances">
          <TableUnitsBalances
            data={balanceUnit.balances}
            errorBalanceUnit={errorBalanceUnit}
          />
        </div>
        {/* <div className="account-balance__grants">
          <TableUnitsGrants
            data={balanceUnit.grants}
            errorBalanceUnit={errorBalanceUnit}
          />
        </div>
        <div className="account-balance__accumalators">
          <TableUnitsAccumulators
            data={balanceUnit.accumulators}
            errorBalanceUnits={errorBalanceUnit}
          />
        </div> */}
      </div>
    );
  }
}
Balances.propTypes = {
  balanceUnit: PropTypes.object,
  errorBalanceUnit: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  balanceUnit: makeGetBalanceUnit() || {},
  errorBalanceUnit: makeErrorMessageBU() || '',
});
export default connect(mapStateToProps)(Balances);
