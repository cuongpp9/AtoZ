import React, { PureComponent } from 'react';
import { fromJS } from 'immutable';
import { Field, FieldArray } from 'redux-form/immutable';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { Switch } from 'components/commons';
import {
  FormGroup,
  RenderSelectField,
  RenderFieldFormat,
  RenderField,
  RenderCheckBoxField,
  RenderDatePickerField,
} from '../../../components/form';
import {
  required,
  phoneNumber,
  phoneType,
  email,
  roles,
} from './validate/validate';
import { dataSelect } from '../../../constantsApp';

const renderInputPhone = ({ fields, referenceParent }) => (
  <ul>
    {fields.map((phone, index) => (
      <li key={phone} className="m-t">
        <FormGroup title="Phone" className="form__form-group-phone">
          <div className="form__form-group-phone-left">
            <Field
              name={`${phone}.number`}
              component={RenderFieldFormat}
              type="text"
              placeholder="Phone Number"
              mask={[
                /[1-9]/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
              validate={phoneNumber}
              disabled={referenceParent}
            />
          </div>
          <div className="form__form-group-phone-right m-b">
            <Field
              name={`${phone}.type`}
              component={RenderSelectField}
              type="text"
              options={dataSelect.phoneType.map(item => ({
                value: item.value,
                label: item.label,
              }))}
              placeholder="Phone Type"
              validate={phoneType}
              isDisabled={referenceParent}
            />
          </div>
          {!referenceParent && (
            <button
              type="button"
              title="Remove phone"
              className="form-section__icon-trash"
              onClick={() => fields.remove(index)}
            >
              <i className="fa fa-trash" />
            </button>
          )}
        </FormGroup>
      </li>
    ))}
    {!referenceParent && (
      <li className="m-t">
        <button
          type="button"
          className="btn btn-success form-section__btn-add form-section__btn-add-input"
          onClick={() => fields.push(fromJS({}))}
        >
          Add Phone
        </button>
      </li>
    )}
  </ul>
);

renderInputPhone.propTypes = {
  fields: PropTypes.any,
  // meta: PropTypes.object,
  referenceParent: PropTypes.bool,
};

const renderSectionForm = ({ fields, meta: { error }, referenceParent }) => (
  <ul>
    {fields.map((contact, id) => (
      <li key={contact}>
        <section>
          <div className="table-title table-title-form">
            <h3 className="bold-text">Contacts Info</h3>
            {fields.length > 1 &&
              !referenceParent && (
              <button
                type="button"
                title="Remove Contact"
                className="form-section__icon-trash"
                onClick={() => fields.remove(id)}
              >
                <i className="fa fa-trash" />
              </button>
            )}
          </div>
          <div className="form-content">
            <div className="form__half">
              <FormGroup title="Salutation">
                <Field
                  name={`${contact}.salutation`}
                  component={RenderField}
                  type="text"
                  placeholder="Salutation"
                  disabled={referenceParent}
                />
              </FormGroup>
              <FormGroup title="First Name">
                <Field
                  name={`${contact}.firstName`}
                  component={RenderField}
                  type="text"
                  placeholder="First Name"
                  validate={required('First Name')}
                  disabled={referenceParent}
                />
              </FormGroup>
              <FormGroup title="Middle Name">
                <Field
                  name={`${contact}.middleName`}
                  component={RenderField}
                  type="text"
                  placeholder="Middle Name"
                  disabled={referenceParent}
                />
              </FormGroup>
              <FormGroup title="Last Name">
                <Field
                  name={`${contact}.lastName`}
                  component={RenderField}
                  type="text"
                  placeholder="Last Name"
                  validate={required('Last Name')}
                  disabled={referenceParent}
                />
              </FormGroup>
              <FormGroup title="Position">
                <Field
                  name={`${contact}.position`}
                  component={RenderField}
                  type="text"
                  placeholder="Position"
                  disabled={referenceParent}
                />
              </FormGroup>
              <div className={`form__form-group-check ${error ? 'error' : ''}`}>
                <FormGroup title="Roles">
                  <Field
                    name={`${contact}.billing`}
                    component={RenderCheckBoxField}
                    label="Use As Billing"
                    valueCheckBox="BILLING"
                    disabled={referenceParent}
                  />
                  <Field
                    name={`${contact}.sold_to`}
                    component={RenderCheckBoxField}
                    label="Use As Ship To"
                    valueCheckBox="SOLD_TO"
                    disabled={referenceParent}
                  />
                  <Field
                    name={`${contact}.payment`}
                    component={RenderCheckBoxField}
                    label="Use As Payment"
                    valueCheckBox="PAYMENT"
                    disabled={referenceParent}
                  />
                  <Field
                    name={`${contact}.service`}
                    component={RenderCheckBoxField}
                    label="Use As Service"
                    valueCheckBox="SERVICE"
                    disabled={referenceParent}
                  />
                </FormGroup>
                {error && (
                  <span className="form__form-group-check-error">{error}</span>
                )}
              </div>
            </div>
            <div className="form__half">
              <FormGroup title="Organization">
                <Field
                  name={`${contact}.organization`}
                  component={RenderField}
                  type="text"
                  placeholder="Organization"
                  validate={required('Organization')}
                  disabled={referenceParent}
                />
              </FormGroup>
              <FormGroup title="Email">
                <Field
                  name={`${contact}.email`}
                  component={RenderField}
                  type="email"
                  placeholder="example@mail.com"
                  validate={[required('Email'), email]}
                  disabled={referenceParent}
                />
              </FormGroup>
              <FormGroup title="Created Date">
                <Field
                  name={`${contact}createdDate`}
                  component={RenderDatePickerField}
                  placeholder="YYYY-MM-DD"
                  disabled={referenceParent}
                />
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
              </FormGroup>
              <FieldArray
                name={`${contact}.phones`}
                component={renderInputPhone}
                referenceParent={referenceParent}
              />
            </div>
          </div>
        </section>
      </li>
    ))}
    {!referenceParent && (
      <li>
        <button
          type="button"
          className="btn btn-success form-section__btn-add"
          onClick={() => fields.push(fromJS({}))}
        >
          Add New Contact
        </button>
      </li>
    )}
  </ul>
);

renderSectionForm.propTypes = {
  fields: PropTypes.any,
  meta: PropTypes.object,
  referenceParent: PropTypes.bool,
};
class CreateContact extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      referenceParent: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isDisplayReference !== nextProps.isDisplayReference) {
      this.setState({ referenceParent: false });
      this.props.onChangeReferenceContact(false);
    }
  }

  onChangeReference = () => {
    const { referenceParent } = this.state;
    const { onChangeReferenceContact } = this.props;
    this.setState({ referenceParent: !referenceParent });
    onChangeReferenceContact(!referenceParent);
  };

  renderReferenceParent() {
    const { referenceParent } = this.state;
    const { isDisplayReference } = this.props;
    if (!isDisplayReference) {
      return null;
    }
    return (
      <Row className="mb-3 ml-3">
        <Col md={12}>
          <FormGroup title="Reference Parent:">
            <Switch
              idForm="is_reference_contact"
              checked={referenceParent}
              onChangeToggle={this.onChangeReference}
            />
          </FormGroup>
        </Col>
      </Row>
    );
  }

  render() {
    const { referenceParent } = this.state;
    return (
      <div className="form-section">
        {this.renderReferenceParent()}
        <FieldArray
          name="contacts"
          component={renderSectionForm}
          validate={roles('contact')}
          referenceParent={referenceParent}
        />
      </div>
    );
  }
}

CreateContact.propTypes = {
  isDisplayReference: PropTypes.bool,
  onChangeReferenceContact: PropTypes.func,
};

CreateContact.defaultProps = {
  isDisplayReference: false,
};

export default CreateContact;
