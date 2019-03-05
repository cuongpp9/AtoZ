import React from 'react';
import { Field } from 'redux-form/immutable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  FormGroup,
  RenderSelectField,
  RenderField,
} from 'components/form';
import { required } from '../validate/validate';
import { dataSelect } from 'constantsApp';
class FormBillingProfile extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { billing, isNonPaying } = this.props;
    return (
      <div className="form-content">
        <div className="form__half">
          <FormGroup title="Parent Id">
            <Field
              name={`${billing}.parentId`}
              component={RenderField}
              type="text"
              placeholder="Parent Id"
              disabled={isNonPaying}
            />
          </FormGroup>
          <FormGroup title="Billing Dom">
            <Field
              name={`${billing}.billingDom`}
              component={RenderField}
              type="number"
              placeholder="BillingDom"
              disabled={isNonPaying}
            />
          </FormGroup>
          <FormGroup title="Billing Segment">
            <Field
              name={`${billing}.billingSegment`}
              component={RenderField}
              type="text"
              placeholder="Billing Segment"
              disabled={isNonPaying}
            />
          </FormGroup>
          <FormGroup title="Billing Frequency">
            <Field
              name={`${billing}.billingFrequency`}
              component={RenderSelectField}
              options={dataSelect.billingFrequency}
              placeholder="Billing Frequency"
              validate={required('Billing Frequency')}
              isDisabled={isNonPaying}
            />
          </FormGroup>
        </div>
        <div className="form__half">
          <FormGroup title="Invoice Type">
            <Field
              name={`${billing}.invoiceType`}
              component={RenderSelectField}
              options={dataSelect.invoiceType}
              placeholder="Invoice Type"
              validate={required('Invoice Type')}
              isDisabled={isNonPaying}
            />
          </FormGroup>
          <FormGroup title="Invoice Delivery">
            <Field
              name={`${billing}.invoiceDelivery`}
              component={RenderSelectField}
              options={dataSelect.invoiceDelivery}
              placeholder="Invoice Delivery"
              validate={required('Invoice Delivery')}
              isDisabled={isNonPaying}
            />
          </FormGroup>
          <FormGroup title="Payment Profile Id">
            <Field
              name={`${billing}.paymentProfileId`}
              component={RenderField}
              type="text"
              placeholder="Payment Profile Id"
              validate={required('Payment Profile Id')}
              disabled={isNonPaying}
            />
          </FormGroup>
        </div>
      </div>
    );
  }
}

FormBillingProfile.propTypes = {
  billing: PropTypes.any,
  isNonPaying: PropTypes.bool,
};

export default FormBillingProfile;