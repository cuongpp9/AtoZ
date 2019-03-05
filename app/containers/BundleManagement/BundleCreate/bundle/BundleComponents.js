import React from 'react';
import { FieldArray } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { renderSectionForm } from './components/FormComponent';

class BundleComponents extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      onSelectBundle,
      onSelectPriceOffer,
      unSelectBundle,
      unSelectPriceOffer,
    } = this.props;
    return (
      <div className="form-section">
        <FieldArray
          name="components"
          component={renderSectionForm}
          onSelectBundle={onSelectBundle}
          onSelectPriceOffer={onSelectPriceOffer}
          unSelectBundle={unSelectBundle}
          unSelectPriceOffer={unSelectPriceOffer}
        />
      </div>
    );
  }
}

BundleComponents.propTypes = {
  onSelectBundle: PropTypes.func,
  onSelectPriceOffer: PropTypes.func,
  unSelectBundle: PropTypes.func,
  unSelectPriceOffer: PropTypes.func,
};

export default BundleComponents;
