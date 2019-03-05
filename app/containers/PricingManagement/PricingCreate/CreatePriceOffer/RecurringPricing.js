import React from 'react';
import { Field, FieldArray } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { FormPanel, FormGroup, RenderSelectField } from 'components/form';
import { dataSelect } from 'constantsApp';
import { renderBlockPrice } from './components';

const renderSectionForm = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    {fields.map(recurring => (
      <li key={recurring} className="m-t">
        <div className="form-content">
          <div className="form__half">
            <FormGroup title="Purchase Proration">
              <Field
                name={`${recurring}.purchaseProration`}
                component={RenderSelectField}
                type="text"
                options={dataSelect.proration.map(item => ({
                  value: item.value,
                  label: item.label,
                }))}
                placeholder="Purchase Proration"
              />
            </FormGroup>
            <FormGroup title="Cancel Proration">
              <Field
                name={`${recurring}.cancelProration`}
                component={RenderSelectField}
                type="text"
                options={dataSelect.proration.map(item => ({
                  value: item.value,
                  label: item.label,
                }))}
                placeholder="Cancel Proration"
              />
            </FormGroup>
          </div>
          <div className="form__half">
            <FormGroup title="Upgrade Proration">
              <Field
                name={`${recurring}.upgradeProration`}
                component={RenderSelectField}
                type="text"
                options={dataSelect.proration.map(item => ({
                  value: item.value,
                  label: item.label,
                }))}
                placeholder="Upgrade Proration"
              />
            </FormGroup>
            <FormGroup title="Downgrade Proration">
              <Field
                name={`${recurring}.downgradeProration`}
                component={RenderSelectField}
                type="text"
                options={dataSelect.proration.map(item => ({
                  value: item.value,
                  label: item.label,
                }))}
                placeholder="Downgrade Proration"
              />
            </FormGroup>
          </div>
          <div className="m-t">
            <FieldArray
              name={`${recurring}.prices`}
              component={renderBlockPrice}
            />
          </div>
        </div>
      </li>
    ))}
    <li className="m-t">{submitFailed && error && <span>{error}</span>}</li>
  </ul>
);
renderSectionForm.propTypes = {
  fields: PropTypes.any,
  meta: PropTypes.object,
};
class RecurringPricingCreate extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <FormPanel title="Recurring Pricing">
        <div className="form-section">
          <FieldArray name="recurringPricing" component={renderSectionForm} />
        </div>
      </FormPanel>
    );
  }
}

export default RecurringPricingCreate;
