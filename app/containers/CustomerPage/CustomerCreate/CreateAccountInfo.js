import React from 'react';
import { Field } from 'redux-form/immutable';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import PropTypes from 'prop-types';
import listCurrency from '../../../constantsApp/currency.json';
import {
  FormGroup,
  RenderSelectField,
  RenderField,
  RenderDatePickerField,
} from '../../../components/form';
import { dataSelect } from '../../../constantsApp';
import { required } from './validate/validate';
export class CreateAccountInfo extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  renderSectionForm() {
    const { isNonPaying } = this.props;
    return (
      <section>
        <div className="table-title table-title-form">
          <h3 className="bold-text">Basic Info</h3>
        </div>
        <div className="form-content">
          <div className="form__half">
            <FormGroup title="Customer Segment">
              <Field
                name="customerSegment"
                component={RenderSelectField}
                options={dataSelect.customerSegment}
                placeholder="Customer Segment"
                isDisabled={isNonPaying}
              />
            </FormGroup>
            <FormGroup title="Account Type">
              <Field
                name="type"
                component={RenderSelectField}
                options={dataSelect.accountType}
                placeholder="Account Type"
                isDisabled={isNonPaying}
              />
            </FormGroup>
            <FormGroup title="Account SubType">
              <Field
                name="subType"
                component={RenderSelectField}
                options={dataSelect.accountSubType}
                placeholder="Account SubType"
                isDisabled={isNonPaying}
              />
            </FormGroup>
            <FormGroup title="Sales Channel">
              <Field
                name="salesChannel"
                component={RenderSelectField}
                type="text"
                options={dataSelect.salesChannel}
                placeholder="Sales Channel"
                isDisabled={isNonPaying}
              />
            </FormGroup>
            <FormGroup title="Market Segment">
              <Field
                name="marketSegment"
                component={RenderSelectField}
                type="text"
                options={dataSelect.marketSegment}
                placeholder="Market Segment"
                isDisabled={isNonPaying}
              />
            </FormGroup>
          </div>
          <div className="form__half">
            <FormGroup title="Selling Company">
              <Field
                name="sellingCompany"
                component={RenderField}
                type="text"
                placeholder="Selling Company"
                disabled={isNonPaying}
              />
            </FormGroup>
            <FormGroup title="Line Of Business">
              <Field
                name="lineOfBusiness"
                component={RenderField}
                type="text"
                placeholder="Line Of Business"
                disabled={isNonPaying}
              />
            </FormGroup>
            <FormGroup title="Legal Entity">
              <Field
                name="legalEntity"
                component={RenderField}
                type="text"
                placeholder="Legal Entity"
                disabled={isNonPaying}
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
                validate={required('Currency')}
                isDisabled={isNonPaying}
              />
            </FormGroup>
            <FormGroup title="Effective Date">
              <Field
                name="effectiveDate"
                component={RenderDatePickerField}
                placeholder="YYYY-MM-DD"
                isMinDate
                disabled={isNonPaying}
              />
              <div className="form__form-group-icon">
                <CalendarBlankIcon />
              </div>
            </FormGroup>
          </div>
        </div>
      </section>
    );
  }
  render() {
    return <div className="form-section">{this.renderSectionForm()}</div>;
  }
}

CreateAccountInfo.propTypes = {
  isNonPaying: PropTypes.bool,
};

export default CreateAccountInfo;
