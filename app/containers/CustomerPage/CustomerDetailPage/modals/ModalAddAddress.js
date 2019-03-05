import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import classNames from 'classnames';
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormAbstract, FormGroup, SelectField } from 'components/form';
import { ButtonCustom, InputValidate, CheckBox } from 'components/commons';
import { getCities, getZips } from 'utils/utils';
import { countryList, stateUSData } from 'constantsApp/countryList';

class ModalAddAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      street: '',
      extraLine: '',
      landmark: '',
      createdDate: null,
      country: '',
      state: '',
      city: '',
      postalCode: '',
      code: '',
      asBilling: false,
      asShipTo: false,
      asPayment: false,
      asService: false,
    };
  }

  onChangeCountry = countryVal => {
    const { country } = this.state;
    if (
      (country && country !== countryVal) ||
      (!country && countryVal === 'USA')
    ) {
      this.setState({
        state: '',
        city: '',
        postalCode: '',
        code: '',
        country: countryVal,
      });
    } else {
      this.setState({ country: countryVal });
    }
  };

  onChangeState = stateVal => {
    const { state } = this.state;
    if (state && state !== stateVal) {
      this.setState({
        state: stateVal,
        city: '',
        postalCode: '',
        code: '',
      });
    } else {
      this.setState({ state: stateVal });
    }
  };

  onChangeCity = cityVal => {
    const { city } = this.state;
    if (city && city !== cityVal) {
      this.setState({
        city: cityVal,
        postalCode: '',
        code: '',
      });
    } else {
      this.setState({ city: cityVal });
    }
  };

  onChangePostalCode = postalCodeVal => {
    const { postalCode } = this.state;
    if (postalCode && postalCode !== postalCodeVal) {
      this.setState({
        postalCode: postalCodeVal,
        code: '',
      });
    } else {
      this.setState({ postalCode: postalCodeVal });
    }
  };

  onChangeText = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onChangeSelect = (name, val) => {
    this.setState({ [name]: val });
  };

  onChangeDate = (name, date) => {
    this.setState({
      [name]: date,
    });
  };

  onChangeCheckBox = name => {
    this.setState(preState => ({
      [name]: !preState[name],
    }));
  };

  parseRoles() {
    const roles = [];
    const { asBilling, asPayment, asShipTo, asService } = this.state;
    if (asBilling) {
      roles.push('BILLING');
    }
    if (asShipTo) {
      roles.push('SOLD_TO');
    }
    if (asPayment) {
      roles.push('PAYMENT');
    }
    if (asService) {
      roles.push('SERVICE');
    }
    return roles;
  }

  onHandleAddAddress = evt => {
    evt.preventDefault();
    const {
      id,
      street,
      extraLine,
      landmark,
      country,
      state,
      city,
      postalCode,
      code,
      createdDate,
    } = this.state;
    const dataAddress = {
      id,
      street,
      extraLine,
      landmark,
      country,
      state,
      city,
      postalCode,
      code,
      createdDate: createdDate
        ? moment(createdDate).format('YYYY-MM-DD')
        : null,
      roles: this.parseRoles(),
    };
    console.log('onHandleAddAddress: ', dataAddress);
  };
  toggleModal = () => {
    const { toggleModal } = this.props;
    toggleModal();
    this.setState({
      id: '',
      street: '',
      extraLine: '',
      landmark: '',
      createdDate: null,
      country: '',
      state: '',
      city: '',
      postalCode: '',
      code: '',
      asBilling: false,
      asShipTo: false,
      asPayment: false,
      asService: false,
    });
  };

  render() {
    const { openModal, modalTitle } = this.props;
    const {
      id,
      street,
      extraLine,
      landmark,
      country,
      state,
      city,
      postalCode,
      code,
      createdDate,
    } = this.state;

    let countrySelected = null;
    let stateSelected = null;
    let citySelected = null;
    let postalCodeSelected = null;

    if (country) {
      const ctr = countryList.find(el => el.value === country);
      countrySelected = {
        label: `${ctr.label} (${ctr.value})`,
        value: ctr.value,
      };
    }

    if (country === 'USA' && state) {
      const st = stateUSData.find(el => el.value === state);
      stateSelected = st
        ? { label: `${st.label} (${st.value})`, value: st.value }
        : null;
    }

    if (country === 'USA' && state && city) {
      const ct = getCities(state).find(el => el.city === city);
      citySelected = ct ? { label: ct.city, value: ct.city } : null;
    }

    if (country === 'USA' && state && city && postalCode) {
      const pc = getZips(city, state).find(el => el.zipcode === postalCode);
      postalCodeSelected = pc ? { label: pc.zipcode, value: pc.zipcode } : null;
    }

    return (
      <Modal
        isOpen={openModal}
        toggle={() => this.toggleModal()}
        size="lg"
        className={classNames('modal-custom')}
      >
        <ModalHeader toggle={() => this.toggleModal()}>
          {modalTitle}
        </ModalHeader>
        <ModalBody>
          <FormAbstract onSubmit={this.onHandleAddAddress}>
            <div className="form-section">
              <section className="section">
                <div className="form-content body-modal-add-component">
                  <div className="form__half">
                    <FormGroup title="Id">
                      <InputValidate
                        name="id"
                        type="text"
                        value={id}
                        onChange={this.onChangeText}
                      />
                    </FormGroup>
                    <FormGroup title="Street">
                      <InputValidate
                        name="street"
                        type="text"
                        placeholder="Street can not be blank!"
                        value={street}
                        onChange={this.onChangeText}
                      />
                    </FormGroup>
                    <FormGroup title="Extra Line">
                      <InputValidate
                        name="extraLine"
                        type="text"
                        placeholder="Extra Line can not be blank!"
                        value={extraLine}
                        onChange={this.onChangeText}
                      />
                    </FormGroup>
                    <FormGroup title="Landmark">
                      <input
                        type="text"
                        placeholder="Landmark"
                        name="landmark"
                        value={landmark}
                        onChange={this.onChangeText}
                      />
                    </FormGroup>
                    <FormGroup title="Created Date">
                      <div className="date-picker">
                        <DatePicker
                          className="form__form-group-datepicker"
                          selected={createdDate}
                          onChange={date =>
                            this.onChangeDate('createdDate', date)
                          }
                          dateFormat="YYYY-MM-DD"
                          placeholderText="YYYY-MM-DD"
                          popperPlacement="bottom-start"
                          popperModifiers={{
                            flip: {
                              enabled: false,
                            },
                            preventOverflow: {
                              enabled: true,
                              escapeWithReference: false,
                            },
                          }}
                          autoComplete="off"
                          isClearable
                        />
                      </div>
                      <div className="form__form-group-icon">
                        <CalendarBlankIcon />
                      </div>
                    </FormGroup>
                  </div>
                  <div className="form__half">
                    <FormGroup title="Country">
                      <Select
                        options={countryList.map(item => ({
                          label: `${item.label} (${item.value})`,
                          value: item.value,
                        }))}
                        placeholder="Country"
                        onChange={val => this.onChangeCountry(val.value)}
                        className="form__form-group-select"
                        inputProps={{
                          autoComplete: 'off',
                          autoCorrect: 'off',
                          spellCheck: 'off',
                        }}
                        required
                        isClearable
                      />
                    </FormGroup>
                    {country === 'USA' ? (
                      <div>
                        <FormGroup title="State">
                          <SelectField
                            name="address_state"
                            placeholder="State can not be blank!"
                            options={stateUSData.map(item => ({
                              label: `${item.label} (${item.value})`,
                              value: item.value,
                            }))}
                            valueSelected={stateSelected}
                            getValue={this.onChangeState}
                            required
                          />
                        </FormGroup>
                        <FormGroup title="City">
                          <SelectField
                            name="address_city"
                            placeholder="City"
                            options={
                              state
                                ? getCities(state).map(item => ({
                                    label: item.city,
                                    value: item.city,
                                  }))
                                : [
                                    {
                                      label: 'Please select State before',
                                      value: null,
                                      isDisabled: true,
                                    },
                                  ]
                            }
                            getValue={this.onChangeCity}
                            valueSelected={citySelected}
                            isResetVal={!state}
                          />
                        </FormGroup>
                        <FormGroup title="Postal Code">
                          <SelectField
                            name="address_postalCode"
                            placeholder="Postal Code can not be blank!"
                            options={
                              state && city
                                ? getZips(city, state).map(item => ({
                                    label: item.zipcode,
                                    value: item.zipcode,
                                  }))
                                : [
                                    {
                                      label: 'Please select City before',
                                      value: null,
                                      isDisabled: true,
                                    },
                                  ]
                            }
                            valueSelected={postalCodeSelected}
                            getValue={this.onChangePostalCode}
                            required
                            isResetVal={!state || !city}
                          />
                        </FormGroup>
                        <FormGroup title="Code">
                          <input
                            type="text"
                            placeholder="Code"
                            name="code"
                            value={code}
                            onChange={this.onChangeText}
                          />
                        </FormGroup>
                      </div>
                    ) : (
                      <div>
                        <FormGroup title="State">
                          <InputValidate
                            name="state"
                            type="text"
                            placeholder="State can not be blank!"
                            value={state}
                            onChange={this.onChangeText}
                          />
                        </FormGroup>
                        <FormGroup title="City">
                          <InputValidate
                            name="city"
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={this.onChangeText}
                          />
                        </FormGroup>
                        <FormGroup title="Postal Code">
                          <InputValidate
                            name="postalCode"
                            type="text"
                            placeholder="Postal Code can not be blank!"
                            value={postalCode}
                            onChange={this.onChangeText}
                          />
                        </FormGroup>
                        <FormGroup title="Code">
                          <input
                            type="text"
                            placeholder="Code"
                            name="code"
                            value={code}
                            onChange={this.onChangeText}
                          />
                        </FormGroup>
                      </div>
                    )}
                  </div>

                  <FormGroup
                    title="Roles"
                    className="m-t form-group-contact-checkbox"
                  >
                    <CheckBox
                      name="contactBilling"
                      label="Use As Billing"
                      onChange={() => this.onChangeCheckBox('asBilling')}
                    />
                    <CheckBox
                      name="contactSoldTo"
                      label="Use As Ship To"
                      onChange={() => this.onChangeCheckBox('asShipTo')}
                    />
                    <CheckBox
                      name="contactPayment"
                      label="Use As Payment"
                      onChange={() => this.onChangeCheckBox('asPayment')}
                    />
                    <CheckBox
                      name="contactService"
                      label="Use As Service"
                      onChange={() => this.onChangeCheckBox('asService')}
                    />
                  </FormGroup>
                </div>
              </section>
            </div>
          </FormAbstract>
        </ModalBody>
        <ModalFooter>
          <ButtonCustom
            // loading={isPosting}
            className="btn btn-primary"
            type="submit"
            title="Add New"
            titleloading="Modifying"
            onClick={evt => this.onHandleAddAddress(evt)}
          />
          <Button color="secondary" onClick={() => this.toggleModal()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalAddAddress.propTypes = {
  modalTitle: PropTypes.string,
  openModal: PropTypes.bool,
  toggleModal: PropTypes.func,
};

export default ModalAddAddress;
