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
import { dataSelect } from 'constantsApp';

export const renderBlockGrant = ({ fields }) => (
  <section className="section-form-child">
    <div className="table-title table-title-form">
      <h5 className="bold-text">Grant</h5>
    </div>
    <div className="form-content">
      <ul>
        {fields.map((blockGrant, index) => (
          <li key={blockGrant} className="m-t form__block">
            <div className="form__half">
              <FormGroup title="Index">
                <Field
                  name={`${blockGrant}.index`}
                  component={RenderField}
                  type="number"
                  placeholder="Index"
                />
              </FormGroup>
              <FormGroup title="Resource Id">
                <Field
                  name={`${blockGrant}.resourceId`}
                  component={RenderField}
                  type="text"
                  placeholder="Resource Id"
                  validate={ValidateSingleField}
                />
              </FormGroup>
              <FormGroup title="Amount">
                <Field
                  name={`${blockGrant}.amount`}
                  component={RenderField}
                  type="number"
                  placeholder="Amount"
                  validate={ValidateSingleField}
                />
              </FormGroup>
            </div>
            <div className="form__half">
              <FormGroup title="Grant Duration">
                <Field
                  name={`${blockGrant}.grantDuration`}
                  component={RenderField}
                  type="number"
                  placeholder="Grant Duration"
                  validate={ValidateSingleField}
                />
              </FormGroup>
              <FormGroup title="Grant Unit">
                <Field
                  name={`${blockGrant}.grantUnit`}
                  component={RenderSelectField}
                  type="text"
                  options={dataSelect.grantUnit.map(item => ({
                    value: item.value,
                    label: item.label,
                  }))}
                  placeholder="Grant Unit"
                  validate={ValidateSingleField}
                />
              </FormGroup>
              <FormGroup title=" ">
                <Field
                  name="isQuantityScaleable"
                  component={RenderCheckBoxField}
                  label="Is QuantityScaleable"
                  checkBoxValue="true"
                />
              </FormGroup>
            </div>
            <button
              type="button"
              title="Remove grant"
              className="form-section__icon-trash"
              onClick={() => fields.remove(index)}
            >
              <i className="fa fa-trash" />
            </button>
          </li>
        ))}
        <li className="m-t">
          <button
            type="button"
            className="btn btn-success form-section__btn-add form-section__btn-add-input"
            onClick={() => fields.push(fromJS({}))}
          >
            Add
          </button>
        </li>
      </ul>
    </div>
  </section>
);
renderBlockGrant.propTypes = {
  fields: PropTypes.any,
};
