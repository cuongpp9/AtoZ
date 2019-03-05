import React from 'react';
import { Field } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import {
  FormPanel,
  FormGroup,
  RenderField,
  RenderSelectField,
  RenderDatePickerField,
  ValidateSingleField,
} from 'components/form';
import { dataSelect } from 'constantsApp';
import { countryList, stateUSData } from 'constantsApp/countryList';
import listCurrency from 'constantsApp/currency.json';
// import { required } from '../validate';

class BundleInfo extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { className } = this.props;
    return (
      <FormPanel title="Package" className={className}>
        <div className="form__half">
          <FormGroup title="Id">
            <Field
              name="id"
              component={RenderField}
              type="text"
              placeholder="Id"
              validate={ValidateSingleField}
            />
          </FormGroup>
          <FormGroup title="Name">
            <Field
              name="name"
              component={RenderField}
              type="text"
              placeholder="Name"
              validate={ValidateSingleField}
            />
          </FormGroup>
          <FormGroup title="Description">
            <Field
              name="description"
              component={RenderField}
              textarea
              type="text"
              placeholder="Description"
              validate={ValidateSingleField}
            />
          </FormGroup>
          <FormGroup title="Sales Channel">
            <Field
              name="salesChannel"
              component={RenderSelectField}
              type="text"
              options={dataSelect.salesChannel.map(item => ({
                value: item.value,
                label: item.label,
              }))}
              placeholder="Sales Channel"
            />
          </FormGroup>
          <FormGroup title="Market Segment">
            <Field
              name="marketSegment"
              component={RenderSelectField}
              type="text"
              options={dataSelect.marketSegment.map(item => ({
                value: item.value,
                label: item.label,
              }))}
              placeholder="Market Segment"
            />
          </FormGroup>
          <FormGroup title="Country">
            <Field
              name="country"
              component={RenderSelectField}
              options={countryList.map(item => ({
                label: `${item.label} (${item.value})`,
                value: item.value,
              }))}
              type="text"
              placeholder="Country"
            />
          </FormGroup>
          <FormGroup title="Currency">
            <Field
              name="currency"
              component={RenderSelectField}
              options={listCurrency.currencies.map(item => ({
                label: `${item.name} (${item.code})`,
                value: item.code,
              }))}
              placeholder="Currency"
              // validate={required('Currency')}
            />
          </FormGroup>
        </div>
        <div className="form__half">
          <FormGroup title="Account Type">
            <Field
              name="accountType"
              component={RenderSelectField}
              type="text"
              options={dataSelect.accountType.map(item => ({
                value: item.value,
                label: item.label,
              }))}
              placeholder="Account Type"
            />
          </FormGroup>
          <FormGroup title="Account Sub Type">
            <Field
              name="accountSubType"
              component={RenderSelectField}
              type="text"
              options={dataSelect.accountSubType.map(item => ({
                value: item.value,
                label: item.label,
              }))}
              placeholder="Account Sub Type"
            />
          </FormGroup>
          <FormGroup title="Status">
            <Field
              name="status"
              component={RenderSelectField}
              type="text"
              options={dataSelect.statusPricing.map(item => ({
                value: item.value,
                label: item.label,
              }))}
              placeholder="Status"
            />
          </FormGroup>
          <FormGroup title="Start Date">
            <Field
              name="startDate"
              component={RenderDatePickerField}
              placeholder="Start Date"
            />
            <div className="form__form-group-icon">
              <CalendarBlankIcon />
            </div>
          </FormGroup>
          <FormGroup title="End Date">
            <Field
              name="endDate"
              component={RenderDatePickerField}
              placeholder="End Date"
            />
            <div className="form__form-group-icon">
              <CalendarBlankIcon />
            </div>
          </FormGroup>
          <FormGroup title="Minimum Quantity">
            <Field
              name="minimumQuantity"
              component={RenderField}
              type="number"
              placeholder="Minimum Quantity"
            />
          </FormGroup>
          <FormGroup title="Maximum Quantity">
            <Field
              name="maximumQuantity"
              component={RenderField}
              type="number"
              placeholder="Maximum Quantity"
            />
          </FormGroup>
        </div>
      </FormPanel>
    );
  }
}

BundleInfo.propTypes = {
  className: PropTypes.string,
};

export default BundleInfo;
