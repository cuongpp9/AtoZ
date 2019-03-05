import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import { fromJS } from 'immutable';
import { Field, FieldArray } from 'redux-form/immutable';
import { Row, Col } from 'reactstrap';
import { Switch } from 'components/commons';
import {
  FormGroup,
  RenderField,
  RenderCheckBoxField,
  RenderDatePickerField,
} from '../../../components/form';
import FormChildAddress from './components/FormChildAddress';
import { required, roles } from './validate/validate';

const renderSectionForm = ({
  fields,
  meta: { error },
  onSelectCountry,
  onSelectState,
  unSelectState,
  onSelectCity,
  unSelectCity,
  onSelectPostalCode,
  unSelectPostalCode,
  onSelectCode,
  unSelectCode,
  referenceParent,
  addresses,
}) => (
  <ul>
    {fields.map((address, id) => (
      <li key={address}>
        <section>
          <div className="table-title table-title-form">
            <h3 className="bold-text">Addresses Info</h3>
            {fields.length > 1 &&
              !referenceParent && (
              <button
                type="button"
                title="Remove Address"
                className="form-section__icon-trash"
                onClick={() => fields.remove(id)}
              >
                <i className="fa fa-trash" />
              </button>
            )}
          </div>
          <div className="form-content">
            <div className="form__half">
              <FormGroup title="Street">
                <Field
                  name={`${address}.street`}
                  component={RenderField}
                  type="text"
                  placeholder="Street"
                  validate={required('Street')}
                  disabled={referenceParent}
                />
              </FormGroup>
              <FormGroup title="Extra Line">
                <Field
                  name={`${address}.extraLine`}
                  component={RenderField}
                  type="text"
                  placeholder="Extra Line"
                  validate={required('Extra Line')}
                  disabled={referenceParent}
                />
              </FormGroup>
              <FormGroup title="Landmark">
                <Field
                  name={`${address}.landmark`}
                  component={RenderField}
                  type="text"
                  placeholder="Landmark"
                  disabled={referenceParent}
                />
              </FormGroup>
              <FormGroup title="Created Date">
                <Field
                  name={`${address}.createdDate`}
                  component={RenderDatePickerField}
                  placeholder="YYYY-MM-DD"
                  disabled={referenceParent}
                />
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
              </FormGroup>
              <div className={`form__form-group-check ${error ? 'error' : ''}`}>
                <FormGroup title="Roles" className="form__form-group-check">
                  <Field
                    name={`${address}.billing`}
                    component={RenderCheckBoxField}
                    label="Use As Billing"
                    value="BILLING"
                    disabled={referenceParent}
                  />
                  <Field
                    name={`${address}.sold_to`}
                    component={RenderCheckBoxField}
                    label="Use As Ship To"
                    value="SOLD_TO"
                    disabled={referenceParent}
                  />
                  <Field
                    name={`${address}.payment`}
                    component={RenderCheckBoxField}
                    label="Use As Payment"
                    value="PAYMENT"
                    disabled={referenceParent}
                  />
                  <Field
                    name={`${address}.service`}
                    component={RenderCheckBoxField}
                    label="Use As Service"
                    value="SERVICE"
                    disabled={referenceParent}
                  />
                </FormGroup>
                {error && (
                  <span className="form__form-group-check-error">{error}</span>
                )}
              </div>
            </div>
            <FormChildAddress
              disabled={referenceParent}
              address={address}
              onSelectCountry={onSelectCountry}
              onSelectState={onSelectState}
              unSelectState={unSelectState}
              onSelectCity={onSelectCity}
              unSelectCity={unSelectCity}
              onSelectPostalCode={onSelectPostalCode}
              unSelectPostalCode={unSelectPostalCode}
              onSelectCode={onSelectCode}
              unSelectCode={unSelectCode}
              idx={id}
              valuesInit={
                addresses[id] && addresses[id].valuesInit
                  ? addresses[id].valuesInit
                  : {}
              }
            />
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
          Add New Address
        </button>
      </li>
    )}
  </ul>
);
renderSectionForm.propTypes = {
  fields: PropTypes.any,
  meta: PropTypes.object,
  onSelectCountry: PropTypes.func,
  onSelectState: PropTypes.func,
  unSelectState: PropTypes.func,
  onSelectCity: PropTypes.func,
  unSelectCity: PropTypes.func,
  onSelectPostalCode: PropTypes.func,
  unSelectPostalCode: PropTypes.func,
  onSelectCode: PropTypes.func,
  unSelectCode: PropTypes.func,
  referenceParent: PropTypes.bool,
  addresses: PropTypes.any,
};

class CreateInfoAddresses extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      referenceParent: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isDisplayReference !== nextProps.isDisplayReference) {
      this.setState({ referenceParent: false });
      this.props.onChangeReferenceAddress(false);
    }
  }

  onChangeReference = () => {
    const { referenceParent } = this.state;
    const { onChangeReferenceAddress } = this.props;
    this.setState({ referenceParent: !referenceParent });
    onChangeReferenceAddress(!referenceParent);
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
              idForm="is_reference_addresses"
              checked={referenceParent}
              onChangeToggle={this.onChangeReference}
            />
          </FormGroup>
        </Col>
      </Row>
    );
  }

  render() {
    const {
      onSelectCountry,
      onSelectState,
      unSelectState,
      onSelectCity,
      unSelectCity,
      onSelectPostalCode,
      unSelectPostalCode,
      onSelectCode,
      unSelectCode,
      addresses,
    } = this.props;

    const { referenceParent } = this.state;
    return (
      <div className="form-section">
        {this.renderReferenceParent()}
        <FieldArray
          name="addresses"
          component={renderSectionForm}
          onSelectCountry={onSelectCountry}
          onSelectState={onSelectState}
          unSelectState={unSelectState}
          onSelectCity={onSelectCity}
          unSelectCity={unSelectCity}
          onSelectPostalCode={onSelectPostalCode}
          unSelectPostalCode={unSelectPostalCode}
          onSelectCode={onSelectCode}
          unSelectCode={unSelectCode}
          validate={roles('address')}
          referenceParent={referenceParent}
          addresses={addresses.size ? addresses.toJS() : addresses}
        />
      </div>
    );
  }
}

CreateInfoAddresses.propTypes = {
  onSelectCountry: PropTypes.func,
  onSelectState: PropTypes.func,
  unSelectState: PropTypes.func,
  onSelectCity: PropTypes.func,
  unSelectCity: PropTypes.func,
  onSelectPostalCode: PropTypes.func,
  unSelectPostalCode: PropTypes.func,
  onSelectCode: PropTypes.func,
  unSelectCode: PropTypes.func,
  isDisplayReference: PropTypes.bool,
  onChangeReferenceAddress: PropTypes.func,
  addresses: PropTypes.object,
};

CreateInfoAddresses.defaultProps = {
  isDisplayReference: false,
};

export default CreateInfoAddresses;
