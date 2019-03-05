import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import {
  FormPanel,
  FormGroup,
  RenderField,
  RenderSelectField,
  RenderDatePickerField,
  ValidateSingleField,
} from 'components/form';
import { InputValidate } from 'components/commons';
import { dataSelect } from 'constantsApp';
// import SelectItemId from '../components/SelectItemId';
class PriceOfferInfo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onToggleModal, itemId } = this.props;
    return (
      <FormPanel title="Price Offer">
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
          <FormGroup title="Item Id">
            <div className="form__form-group-input-wrap">
              <InputValidate
                placeholder="Field can not be empty!"
                type="text"
                value={itemId}
                onClick={() => onToggleModal()}
              />
            </div>
          </FormGroup>
          <FormGroup title="Transaction Type">
            <Field
              name="transactionType"
              component={RenderSelectField}
              type="text"
              options={dataSelect.transactionType.map(item => ({
                value: item.value,
                label: item.label,
              }))}
              placeholder="Transaction Type"
              validate={ValidateSingleField}
            />
          </FormGroup>
          <FormGroup title="Pricing Model">
            <Field
              name="pricingModel"
              component={RenderSelectField}
              type="text"
              options={dataSelect.pricingModel.map(item => ({
                value: item.value,
                label: item.label,
              }))}
              placeholder="Pricing Model"
              validate={ValidateSingleField}
            />
          </FormGroup>
          <FormGroup title="Service Type">
            <Field
              name="serviceType"
              component={RenderSelectField}
              type="text"
              options={dataSelect.serviceType.map(item => ({
                value: item.value,
                label: item.label,
              }))}
              placeholder="Service Type"
              validate={ValidateSingleField}
            />
          </FormGroup>
          <FormGroup title="Service Add On">
            <Field
              name="serviceAddOn"
              component={RenderField}
              type="text"
              placeholder="Service Add On"
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
              validate={ValidateSingleField}
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
          <FormGroup title="Start Unit">
            <Field
              name="startUnit"
              component={RenderSelectField}
              type="text"
              options={dataSelect.unit.map(item => ({
                value: item.value,
                label: item.label,
              }))}
              placeholder="Start Unit"
            />
          </FormGroup>
          <FormGroup title="Start Duration">
            <Field
              name="startDuration"
              component={RenderField}
              type="number"
              placeholder="Start Duration"
            />
          </FormGroup>
          <FormGroup title="End Unit">
            <Field
              name="endUnit"
              component={RenderSelectField}
              type="text"
              options={dataSelect.unit.map(item => ({
                value: item.value,
                label: item.label,
              }))}
              placeholder="End Unit"
            />
          </FormGroup>
          <FormGroup title="End Duration">
            <Field
              name="endDuration"
              component={RenderField}
              type="number"
              placeholder="End Duration"
            />
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

PriceOfferInfo.propTypes = {
  onToggleModal: PropTypes.func,
  itemId: PropTypes.string,
};

export default PriceOfferInfo;
