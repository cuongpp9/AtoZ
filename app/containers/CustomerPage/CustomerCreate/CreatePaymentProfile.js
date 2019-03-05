import React from 'react';
import { Field, FieldArray } from 'redux-form/immutable';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import {
  FormGroup,
  RenderSelectField,
  RenderField,
  RenderFieldFormat,
} from '../../../components/form';
import { required } from './validate/validate';
import { dataSelect } from '../../../constantsApp';

const renderInputCreditCard = ({ fields, isNonPaying }) => {
  console.log('renderInputCreditCard', fields);
  return (
    <ul className="mb-3">
      {fields.map((credit, index) => {
        console.log('AAAAAAAA', credit);
        return (
          <li key={credit} className="card-credit">
            {!isNonPaying &&
              fields.length > 1 && (
              <button
                type="button"
                title="Remove Contact"
                className="form-section__icon-trash pull-right m-b"
                onClick={() => fields.remove(index)}
              >
                <i className="fa fa-trash" />
              </button>
            )}
            <FormGroup title="Card Token">
              <Field
                name={`${credit}.cardToken`}
                component={RenderField}
                type="text"
                placeholder="Card Token"
              />
            </FormGroup>
            <FormGroup title="Card Expiry">
              <Field
                name={`${credit}.cardExpiry`}
                component={RenderFieldFormat}
                type="text"
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  '-',
                  /\d/,
                  /\d/,
                  '-',
                  /\d/,
                  /\d/,
                ]}
                placeholder="Card Expiry"
              />
            </FormGroup>
            <FormGroup title="Last 4CC">
              <Field
                name={`${credit}.last4CC`}
                component={RenderField}
                type="text"
                placeholder="Last 4CC"
              />
            </FormGroup>
            <FormGroup title="Merchant">
              <Field
                name={`${credit}.merchant`}
                component={RenderField}
                type="text"
                placeholder="Merchant"
              />
            </FormGroup>
          </li>
        );
      })}
      {!isNonPaying && (
        <li className="m-t">
          <button
            type="button"
            className="btn btn-success form-section__btn-add form-section__btn-add-input"
            onClick={() => fields.push(fromJS({}))}
          >
            Add Credit Card
          </button>
        </li>
      )}
    </ul>
  );
};

renderInputCreditCard.propTypes = {
  fields: PropTypes.any,
  isNonPaying: PropTypes.bool,
};

const renderSectionForm = ({
  fields,
  meta: { error, submitFailed },
  isNonPaying,
  paymentProfiles,
}) => {
  console.log('renderSectionForm', paymentProfiles);
  return (
    <ul>
      {fields.map((payment, id) => (
        <li key={payment}>
          <section>
            <div className="table-title table-title-form">
              <h3 className="bold-text">Payment Info</h3>
              {fields.length > 1 &&
                !isNonPaying && (
                  <button
                    type="button"
                    title="Remove Payment"
                    className="form-section__icon-trash"
                    onClick={() => fields.remove(id)}
                  >
                    <i className="fa fa-trash" />
                  </button>
                )}
            </div>
            <div className="form-content">
              <div className="form__half">
                <FormGroup title="Payment Term">
                  <Field
                    name={`${payment}.paymentTerm`}
                    component={RenderSelectField}
                    type="text"
                    options={dataSelect.paymentTerm}
                    placeholder="Payment Term"
                    validate={required('Payment Term')}
                    isDisabled={isNonPaying}
                  />
                </FormGroup>
                <FormGroup title="Payment Method">
                  <Field
                    name={`${payment}.paymentMethod`}
                    component={RenderSelectField}
                    type="text"
                    options={dataSelect.paymentMethod.map((item, index) => ({
                      value: item.value,
                      label: item.label,
                      isDisabled: index === 2,
                    }))}
                    placeholder="Payment Method"
                    validate={required('Payment Method')}
                    isDisabled={isNonPaying}
                  />
                </FormGroup>
              </div>
              {paymentProfiles[id].paymentMethod &&
                paymentProfiles[id].paymentMethod.value === 'CREDIT_CARD' && (
                  <div className="form__half">
                    <FieldArray
                      name={`${payment}.creditCards`}
                      component={renderInputCreditCard}
                      isNonPaying={isNonPaying}
                    />
                  </div>
                )}
            </div>
          </section>
        </li>
      ))}
      {!isNonPaying && (
        <li>
          <button
            type="button"
            className="btn btn-success form-section__btn-add"
            onClick={() => fields.push(fromJS({}))}
            disabled
          >
            Add New Payment
          </button>
          {submitFailed && error && <span>{error}</span>}
        </li>
      )}
    </ul>
  );
};

renderSectionForm.propTypes = {
  fields: PropTypes.any,
  meta: PropTypes.object,
  isNonPaying: PropTypes.bool,
  paymentProfiles: PropTypes.array,
};

class CreateInfoPaymentProfiles extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { isNonPaying, paymentProfiles } = this.props;
    return (
      <div className="form-section">
        <FieldArray
          name="paymentProfiles"
          component={renderSectionForm}
          isNonPaying={isNonPaying}
          paymentProfiles={paymentProfiles.toJS()}
        />
      </div>
    );
  }
}

CreateInfoPaymentProfiles.propTypes = {
  isNonPaying: PropTypes.bool,
  paymentProfiles: PropTypes.any,
};

export default CreateInfoPaymentProfiles;
