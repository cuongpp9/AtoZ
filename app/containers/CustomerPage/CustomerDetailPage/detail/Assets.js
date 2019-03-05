import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { TablePriceUnits } from 'components/customers';
import { makeGetPriceUnits, makeErrorMessagePU } from '../../selectors';

class Assets extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { priceUnits, errorPriceUnits } = this.props;
    return (
      <div className="account-assets">
        <TablePriceUnits data={priceUnits} errorPriceUnits={errorPriceUnits} />
      </div>
    );
  }
}

Assets.propTypes = {
  priceUnits: PropTypes.array,
  errorPriceUnits: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  priceUnits: makeGetPriceUnits() || [],
  errorPriceUnits: makeErrorMessagePU() || '',
});

export default connect(mapStateToProps)(Assets);
