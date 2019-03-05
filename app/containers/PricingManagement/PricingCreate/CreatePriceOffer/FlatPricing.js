import React from 'react';
import { FieldArray } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { FormPanel } from 'components/form';
import { renderBlockPrice } from './components';

const renderSectionForm = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    {fields.map(flat => (
      <li key={flat} className="m-t">
        <FieldArray name={`${flat}.prices`} component={renderBlockPrice} />
        {/* <FieldArray name={`${flat}.grants`} component={renderBlockGrant} /> */}
      </li>
    ))}
    <li className="m-t">{submitFailed && error && <span>{error}</span>}</li>
  </ul>
);
renderSectionForm.propTypes = {
  fields: PropTypes.any,
  meta: PropTypes.object,
};
class FlatPricingCreate extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <FormPanel title="Flat Pricing">
        <div className="form-section">
          <FieldArray name="flatPricing" component={renderSectionForm} />
        </div>
      </FormPanel>
    );
  }
}

export default FlatPricingCreate;
