import React from 'react';
import { Field, FieldArray } from 'redux-form/immutable';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import {
  FormPanel,
  FormGroup,
  RenderField,
  RenderSelectField,
  ValidateSingleField,
} from 'components/form';
import { dataSelect } from 'constantsApp';
import { renderBlockPrice } from './components';

const renderSectionForm = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    {fields.map((customer, id) => (
      <li key={customer} className="m-t">
        <section>
          {fields.length > 1 && (
            <div className="table-title table-title-form">
              <button
                type="button"
                title="Remove Price"
                className="form-section__icon-trash"
                onClick={() => fields.remove(id)}
              >
                <i className="fa fa-trash" />
              </button>
            </div>
          )}
          <div className="form-content">
            <div className="form__half">
              <FormGroup title="Index">
                <Field
                  name={`${customer}.index`}
                  component={RenderField}
                  type="number"
                  placeholder="Index"
                  validate={ValidateSingleField}
                  disabled
                />
              </FormGroup>
              <FormGroup title="Sales Channel">
                <Field
                  name={`${customer}.salesChannel`}
                  component={RenderSelectField}
                  options={dataSelect.salesChannel.map(item => ({
                    value: item.value,
                    label: item.label,
                  }))}
                  placeholder="Sales Channel"
                />
              </FormGroup>
              <FormGroup title="Market Segment">
                <Field
                  name={`${customer}.marketSegment`}
                  component={RenderSelectField}
                  options={dataSelect.marketSegment.map(item => ({
                    value: item.value,
                    label: item.label,
                  }))}
                  placeholder="Market Segment"
                />
              </FormGroup>
            </div>
            <div className="form__half">
              <FormGroup title="Account Type">
                <Field
                  name={`${customer}.accountType`}
                  component={RenderSelectField}
                  options={dataSelect.accountType.map(item => ({
                    value: item.value,
                    label: item.label,
                  }))}
                  placeholder="Account Type"
                />
              </FormGroup>
              <FormGroup title="Account SubType">
                <Field
                  name={`${customer}.accountSubType`}
                  component={RenderSelectField}
                  options={dataSelect.accountSubType.map(item => ({
                    value: item.value,
                    label: item.label,
                  }))}
                  placeholder="Account SubType"
                />
              </FormGroup>
            </div>
            <div className="m-t">
              <FieldArray
                name={`${customer}.prices`}
                component={renderBlockPrice}
              />
            </div>
          </div>
        </section>
      </li>
    ))}
    <li className="m-t">
      <button
        type="button"
        className="btn btn-success form-section__btn-add"
        onClick={() =>
          fields.push(
            fromJS({
              index: fields && fields.length ? `${fields.length + 1}` : '1',
              prices: [{ index: '1' }],
            }),
          )
        }
      >
        Add New Customer Pricing
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
  </ul>
);
renderSectionForm.propTypes = {
  fields: PropTypes.any,
  meta: PropTypes.object,
};
class CustomerPricingCreate extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <FormPanel title="Customer Pricing">
        <div className="form-section">
          <FieldArray name="customerPricing" component={renderSectionForm} />
        </div>
      </FormPanel>
    );
  }
}

export default CustomerPricingCreate;
