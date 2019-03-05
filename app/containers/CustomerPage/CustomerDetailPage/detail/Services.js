import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { TableServiceUnits, TableSubscription } from 'components/customers';
import {
  makeGetServiceUnitsAc,
  makeGetSubscription,
  makeErrorMessageSU,
  makeErrorMessageSubscription,
} from '../../selectors';

class Services extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="account-services">
        <TableSubscription
          data={this.props.subscription}
          title="Subsciption"
          errorSubscription={this.props.errorSubscription}
        />
        <TableServiceUnits
          data={this.props.serviceUnitsAc}
          title="Service Units"
          errorServiceUnits={this.props.errorServiceUnits}
        />
      </div>
    );
  }
}

Services.propTypes = {
  serviceUnitsAc: PropTypes.array,
  subscription: PropTypes.object,
  errorServiceUnits: PropTypes.string,
  errorSubscription: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  serviceUnitsAc: makeGetServiceUnitsAc() || [],
  subscription: makeGetSubscription() || {},
  errorServiceUnits: makeErrorMessageSU() || '',
  errorSubscription: makeErrorMessageSubscription() || '',
});

export default connect(mapStateToProps)(Services);
