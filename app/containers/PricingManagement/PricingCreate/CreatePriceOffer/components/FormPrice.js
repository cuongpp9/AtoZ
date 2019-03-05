import React from 'react';
import { Field } from 'redux-form/immutable';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import {
  FormGroup,
  RenderField,
  RenderSelectField,
  RenderCheckBoxField,
  ValidateSingleField,
} from 'components/form';
import listCurrency from 'constantsApp/currency.json';

export const renderBlockPrice = ({ fields }) => (
  <section className="section-form-child">
    <div className="table-title table-title-form table-title-style">
      <h5 className="bold-text">Price</h5>
    </div>
    <div className="form-content">
      <ul>
        {fields.map((blockPrice, index) => (
          <li key={blockPrice} className="form__block">
            <div className="form__half">
              <FormGroup title="Index">
                <Field
                  name={`${blockPrice}.index`}
                  component={RenderField}
                  type="number"
                  placeholder="Index"
                  disabled
                />
              </FormGroup>
              <FormGroup title="Ref Index">
                <Field
                  name={`${blockPrice}.refIndex`}
                  component={RenderField}
                  type="number"
                  placeholder="Ref Index"
                />
              </FormGroup>
              <FormGroup title="Currency">
                <Field
                  name={`${blockPrice}.currencyId`}
                  component={RenderSelectField}
                  options={listCurrency.currencies.map(item => ({
                    value: item.code,
                    label: `${item.name} (${item.code})`,
                  }))}
                  type="text"
                  placeholder="Currency"
                  validate={ValidateSingleField}
                />
              </FormGroup>
            </div>
            <div className="form__half">
              <FormGroup title="Amount">
                <Field
                  name={`${blockPrice}.amount`}
                  component={RenderField}
                  type="number"
                  placeholder="Amount"
                  validate={ValidateSingleField}
                />
              </FormGroup>
              <FormGroup title=" ">
                <Field
                  name={`${blockPrice}.isQuantityScalable`}
                  component={RenderCheckBoxField}
                  label="Is Quantity Scalable"
                />
              </FormGroup>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
renderBlockPrice.propTypes = {
  fields: PropTypes.any,
};
